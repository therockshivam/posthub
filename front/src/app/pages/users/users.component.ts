import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { UserService } from '../../service/user.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
            TableModule,
            FormsModule,
            ButtonModule,
            RippleModule,
            ToastModule,
            ToolbarModule,
            RatingModule,
            InputTextModule,
            TextareaModule,
            SelectModule,
            RadioButtonModule,
            InputNumberModule,
            DialogModule,
            TagModule,
            InputIconModule,
            IconFieldModule,
            ConfirmDialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class UsersComponent {
productDialog: boolean = false;

    users = signal<any[]>([]);

    user!: any;

    selectedUsers!: any[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadUserList();
    }

    loadUserList() {
        this.userService.getUsers().subscribe({
            next: (data: any) => {
          this.users.set(data.items);
            },
            error: (error: any) => {
          console.error('Error fetching users:', error);
            }
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'User Code' },
            { field: 'first name', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'email', header: 'Email' },
            // { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(user: any) {
        this.user = { ...user };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.set(this.users().filter((val) => !this.selectedUsers?.includes(val)));
                this.selectedUsers = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(user: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.set(this.users().filter((val) => val.id !== user.id));
                this.user = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users().length; i++) {
            if (this.users()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveProduct() {
        this.submitted = true;
        let _users = this.users();
        if (this.users.name?.trim()) {
            if (this.user.id) {
                _users[this.findIndexById(this.user.id)] = this.user;
                this.users.set([..._users]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.user.id = this.createId();
                this.user.image = 'product-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.users.set([..._users, this.users]);
            }

            this.productDialog = false;
            this.user = {};
        }
    }
}

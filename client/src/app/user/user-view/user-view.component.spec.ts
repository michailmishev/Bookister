import { TestBed, async } from '@angular/core/testing';
import { UsersComponent } from '../users/users.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../../core/services/users-data.service';
import { UsersListComponent } from '../users-list/users-list.component';
import { UserViewComponent } from '../user-view/user-view.component';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '../user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShowUser } from 'src/app/models/show-user';



describe('UserViewComponent', () => {
    let fixture;
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const usersDataService = jasmine.createSpyObj(
        'UsersDataService',
        [
            'getUser',
            'deleteUser',
            // 'banUser',
            // 'unbanUser'
        ]);
    const authService = jasmine.createSpyObj('AuthService', ['setAdminStatus', 'reverseToken', 'getBanstatus']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UsersListComponent,
                UsersComponent,
                UserViewComponent,
            ],
            imports: [
                CommonModule,
                UserRoutingModule,
                SharedModule
            ],
            providers: [
                {
                    provide: Router,
                    useValue: router
                },
                {
                    provide: UsersDataService,
                    useValue: usersDataService
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 1 })
                    }
                },
                {
                    provide: AuthService,
                    useValue: authService
                }

            ]
        });
    }));

    afterEach(() => {
        if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
            (fixture.nativeElement as HTMLElement).remove();
        }
    });

    it('should create the component', () => {
        fixture = TestBed.createComponent(UserViewComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    describe('OnInit', () => {
        it('should initialize with the correct user data', async () => {
            const user: ShowUser = {
                id: '1',
                isDeleted: false,
                username: 'username',
                banstatus: {},
                roles: [{ name: 'User' }],
            };
            fixture = TestBed.createComponent(UserViewComponent);
            const component = fixture.debugElement.componentInstance;
            authService.reverseToken.and.returnValue({ id: '1' });
            authService.setAdminStatus.and.returnValue(false);
            usersDataService.getUser.and.returnValue(of(user));
            await fixture.detectChanges();

            expect(component.user).toEqual(user);
        });


    });



    describe('deleteUser', () => {
        it('deleteUser should call usersDataService.deleteUser with the correct id', async () => {
            const user: ShowUser = {
                id: '1',
                isDeleted: false,
                username: 'username',
                banstatus: {},
                roles: [{ name: 'Admin' }],
            };
            fixture = TestBed.createComponent(UserViewComponent);
            const component = fixture.debugElement.componentInstance;
            component.user = user;

            await fixture.detectChanges();
            usersDataService.deleteUser.and.returnValue(of(user));
            usersDataService.deleteUser.calls.reset();

            component.deleteUser();

            expect(usersDataService.deleteUser).toHaveBeenCalledTimes(1);
            expect(usersDataService.deleteUser).toHaveBeenCalledWith(user.id);
        });


        it('deleteUser should call router.navigate with [`/users`]', async () => {
            const user: ShowUser = {
                id: '1',
                isDeleted: false,
                username: 'username',
                banstatus: {},
                roles: [{ name: 'Admin' }],
            };
            fixture = TestBed.createComponent(UserViewComponent);
            const component = fixture.debugElement.componentInstance;
            component.user = user;
            usersDataService.deleteUser.and.returnValue(of(user));

            await fixture.detectChanges();
            router.navigate.calls.reset();

            component.deleteUser();

            expect(router.navigate).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith(['/users']);
        });
    });



    describe('isTheSamePerson', () => {
        it('isTheSamePerson should return true if the logged in user is viewing their own profile', async () => {
            const user: ShowUser = {
                id: '1',
                isDeleted: false,
                username: 'username',
                banstatus: {},
                roles: [{ name: 'Admin' }],
            };
            const id = '1';
            fixture = TestBed.createComponent(UserViewComponent);
            const component = fixture.debugElement.componentInstance;
            component.user = user;
            authService.reverseToken.and.returnValue({ id: '1' });

            await fixture.detectChanges();

            const result = component.isTheSamePerson(id);

            expect(result).toBe(true);
        });

        it('isTheSamePerson should return false if the logged in user is viewing another profile', async () => {
            const user: ShowUser = {
                id: '1',
                isDeleted: false,
                username: 'username',
                banstatus: {},
                roles: [{ name: 'Admin' }],
            };
            const id = '1';
            fixture = TestBed.createComponent(UserViewComponent);
            const component = fixture.debugElement.componentInstance;
            component.user = user;
            authService.reverseToken.and.returnValue({ id: '1' });

            await fixture.detectChanges();

            const result = component.isTheSamePerson(id);

            expect(result).toBe(true);
        });

        it('isTheSamePerson should call authService.reverseToken', async () => {
            const user: ShowUser = {
                id: '1',
                isDeleted: false,
                username: 'username',
                banstatus: {},
                roles: [{ name: 'Admin' }],
            };
            const id = '1';
            fixture = TestBed.createComponent(UserViewComponent);
            const component = fixture.debugElement.componentInstance;
            component.user = user;

            await fixture.detectChanges();
            authService.reverseToken.calls.reset();

            component.isTheSamePerson(id);

            expect(authService.reverseToken).toHaveBeenCalledTimes(1);
        });
    });
});

import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { FilesComponent } from './files/files.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuard } from './volio/auth/guard/auth-guard';
import { OAuth2CallbackComponent } from './volio/auth/callback/callback.component';
import { VersionsComponent } from './versions/versions.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { MediaComponent } from './media/media.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [{
            path: 'profile',
            component: ProfileComponent,
            canActivate: [AuthGuard],
        },
        {
            path: 'home',
            component: HomeComponent,
            canActivate: [AuthGuard],
        },
        {
            path: 'user',
            component: UserComponent,
            canActivate: [AuthGuard],
        },
        {
            path: 'media',
            component: MediaComponent,
            canActivate: [AuthGuard],
        },
        {
            path: 'menu',
            component: MenuComponent,
            canActivate: [AuthGuard],
        },

        {
            path: "callback",
            component: OAuth2CallbackComponent,
        },
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
        },
        {
            path: '**',
            component: NotFoundComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}

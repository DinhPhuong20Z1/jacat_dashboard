import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    NbAuthJWTToken,
    NbAuthModule,
    NbPasswordAuthStrategy,
    NbOAuth2AuthStrategy,
    NbOAuth2ResponseType,
} from "@nebular/auth";
import { NbSecurityModule, NbRoleProvider } from "@nebular/security";
import { of as observableOf } from "rxjs";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import {
    AnalyticsService,
    LayoutService,
    PlayerService,
    SeoService,
    StateService,
} from "./utils";
import { UserData } from "./data/users";
import { ElectricityData } from "./data/electricity";
import { SmartTableData } from "./data/smart-table";
import { UserActivityData } from "./data/user-activity";
import { OrdersChartData } from "./data/orders-chart";
import { ProfitChartData } from "./data/profit-chart";
import { TrafficListData } from "./data/traffic-list";
import { EarningData } from "./data/earning";
import { OrdersProfitChartData } from "./data/orders-profit-chart";
import { TrafficBarData } from "./data/traffic-bar";
import { ProfitBarAnimationChartData } from "./data/profit-bar-animation-chart";
import { TemperatureHumidityData } from "./data/temperature-humidity";
import { SolarData } from "./data/solar";
import { TrafficChartData } from "./data/traffic-chart";
import { StatsBarData } from "./data/stats-bar";
import { CountryOrderData } from "./data/country-order";
import { StatsProgressBarData } from "./data/stats-progress-bar";
import { VisitorsAnalyticsData } from "./data/visitors-analytics";
import { SecurityCamerasData } from "./data/security-cameras";

import { UserService } from "./mock/users.service";
import { ElectricityService } from "./mock/electricity.service";
import { SmartTableService } from "./mock/smart-table.service";
import { UserActivityService } from "./mock/user-activity.service";
import { OrdersChartService } from "./mock/orders-chart.service";
import { ProfitChartService } from "./mock/profit-chart.service";
import { TrafficListService } from "./mock/traffic-list.service";
import { EarningService } from "./mock/earning.service";
import { OrdersProfitChartService } from "./mock/orders-profit-chart.service";
import { TrafficBarService } from "./mock/traffic-bar.service";
import { ProfitBarAnimationChartService } from "./mock/profit-bar-animation-chart.service";
import { TemperatureHumidityService } from "./mock/temperature-humidity.service";
import { SolarService } from "./mock/solar.service";
import { TrafficChartService } from "./mock/traffic-chart.service";
import { StatsBarService } from "./mock/stats-bar.service";
import { CountryOrderService } from "./mock/country-order.service";
import { StatsProgressBarService } from "./mock/stats-progress-bar.service";
import { VisitorsAnalyticsService } from "./mock/visitors-analytics.service";
import { SecurityCamerasService } from "./mock/security-cameras.service";
import { MockDataModule } from "./mock/mock-data.module";
import { environment } from "../../environments/environment";
import { GoogleOAuthService } from "./http/google-oauth2.service";
import { AuthsService } from "./http/auth.service";
import { GoogleOAuthData } from "./data/google-oauth";
import { AuthsData } from "./data/auth";
import { UtilsService } from './mock/utils.service';
import { VersionSourcesService } from './http/version-sources.service';
import { VersionSourceData } from './data/version_source';
import { UtilsFunc } from "./data/utils";
import { FilesData } from "./data/files";
import { FilesService } from './http/files.service';
import { UserTable } from "./data/user-table";
import {UserTableService} from "./mock/user-table.service";

const socialLinks = [
    {
        url: environment.homePage + "/auth/callback",
        icon: "google",
    },
];

const DATA_SERVICES = [
    {
        provide: GoogleOAuthData,
        useClass: GoogleOAuthService,
    },
    {
        provide: UtilsFunc,
        useClass: UtilsService,
    },
    {
        provide: AuthsData,
        useClass: AuthsService,
    },
    {
        provide: VersionSourceData,
        useClass: VersionSourcesService,
    },
    {
        provide: FilesData,
        useClass: FilesService,
    },
    { provide: UserData, useClass: UserService },
    { provide: ElectricityData, useClass: ElectricityService },
    { provide: SmartTableData, useClass: SmartTableService },
    { provide: UserActivityData, useClass: UserActivityService },
    { provide: OrdersChartData, useClass: OrdersChartService },
    { provide: ProfitChartData, useClass: ProfitChartService },
    { provide: TrafficListData, useClass: TrafficListService },
    { provide: EarningData, useClass: EarningService },
    { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
    { provide: TrafficBarData, useClass: TrafficBarService },
    {
        provide: ProfitBarAnimationChartData,
        useClass: ProfitBarAnimationChartService,
    },
    { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
    { provide: SolarData, useClass: SolarService },
    { provide: TrafficChartData, useClass: TrafficChartService },
    { provide: StatsBarData, useClass: StatsBarService },
    { provide: CountryOrderData, useClass: CountryOrderService },
    { provide: StatsProgressBarData, useClass: StatsProgressBarService },
    { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
    { provide: SecurityCamerasData, useClass: SecurityCamerasService },
    { provide:UserTable, useClass: UserTableService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
    getRole() {
        // here you could provide any role based on any auth flow
        return observableOf("guest");
    }
}

export const NB_CORE_PROVIDERS = [
    ...MockDataModule.forRoot().providers,
    ...DATA_SERVICES,
    ...NbAuthModule.forRoot({
        strategies: [
            NbPasswordAuthStrategy.setup({
                name: "email",
                baseEndpoint: environment.apiUrl,
                login: {
                    endpoint: "/auth/login",
                    redirect: {
                        success: "/",
                        failure: null,
                    },
                },
                register: {
                    endpoint: "/auth/register",
                },
                token: {
                    class: NbAuthJWTToken,
                    key: "data.token",
                },
                logout: {
                    endpoint: "/auth/logout",
                },
                requestPass: {
                    endpoint: "/auth/request-pass",
                    redirect: {
                        success: "",
                    },
                },
                validation: {
                    password: {
                        required: true,
                        minLength: 6,
                        maxLength: 50,
                    },
                    email: {
                        required: true,
                        regexp: `[a-zA-Z0-9\.-_]+@volio\.vn$`,
                    },
                },
            }),
            NbOAuth2AuthStrategy.setup({
                name: "google",
                clientId:
                    "947239783060-9fdd2r4hksb86bf7n9otoadfl9d920rh.apps.googleusercontent.com",
                clientSecret: "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",
                authorize: {
                    endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
                    responseType: NbOAuth2ResponseType.TOKEN,
                    scope: "openid profile email",
                    redirectUri: environment.homePage + "/auth/callback",
                },
            }),
        ],
        forms: {
            login: {
                socialLinks: socialLinks,
            },
            register: {
                socialLinks: socialLinks,
            },
        },
    }).providers,

    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: "*",
            },
            user: {
                parent: "guest",
                create: "*",
                edit: "*",
                remove: "*",
            },
        },
    }).providers,

    {
        provide: NbRoleProvider,
        useClass: NbSimpleRoleProvider,
    },
    AnalyticsService,
    LayoutService,
    PlayerService,
    SeoService,
    StateService,
];

@NgModule({
    imports: [CommonModule],
exports: [NbAuthModule],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, "CoreModule");
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [...NB_CORE_PROVIDERS],
        };
    }
}

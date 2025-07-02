"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = require("path");
const mailer_service_1 = require("./mailer.service");
const common_module_1 = require("./common.module");
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const templateDir = process.env.NODE_ENV === 'production'
    ? (0, path_1.join)(process.cwd(), 'dist', 'templates')
    : (0, path_1.join)(process.cwd(), 'templates');
console.log('EJS template dir:', templateDir);
let MailerModule = class MailerModule {
};
exports.MailerModule = MailerModule;
exports.MailerModule = MailerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.MAIL_HOST,
                    port: Number(process.env.MAIL_PORT),
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                },
                defaults: {
                    from: process.env.MAIL_FROM || 'noreply@example.com',
                },
                template: {
                    dir: templateDir,
                    adapter: new ejs_adapter_1.EjsAdapter(),
                    options: {
                        strict: false,
                    },
                },
            }),
        ],
        providers: [mailer_service_1.MailerService],
        exports: [mailer_service_1.MailerService],
    })
], MailerModule);
//# sourceMappingURL=mailer.module.js.map
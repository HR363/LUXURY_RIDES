import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { MailerService } from './mailer.service';
import { CommonModule } from './common.module';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

// Dynamically set template directory for dev/prod
const templateDir =
  process.env.NODE_ENV === 'production'
    ? join(process.cwd(), 'dist', 'templates')
    : join(process.cwd(), 'templates');
console.log('EJS template dir:', templateDir);

@Module({
  imports: [
    CommonModule,
    NestMailerModule.forRoot({
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
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {} 
import nodemailer, { type Transporter } from "nodemailer";
import { AppError } from "../../shared/errors/app-error";

export class EmailService {
    private readonly transporter: Transporter;

    constructor() {
        const email = process.env.SMTP_USER;
        const password = process.env.SMTP_PASS;

        if (!email || !password) {
            throw new AppError("Email service is not configured", 500);
        }

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: password,
            },
        });
    }

  sendOtp = async (email: string, otp: string): Promise<void> => {
    try {
      await this.transporter.sendMail({
        from: {
          name: "Dealio",
          address: process.env.SMTP_USER!,
        },
        to: email,
        subject: "Your Dealio verification code",
        text: `Your Dealio verification code is ${otp}. It expires in 3 minutes. If you did not request this code, please ignore this email.`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verify your email - Dealio</title>
          </head>
          <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8;padding:32px 12px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:480px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
                    <tr>
                      <td style="padding:28px 32px;text-align:center;border-bottom:1px solid #e5e7eb;">
                        <h1 style="margin:0;font-size:26px;font-weight:700;color:#2563eb;">Dealio</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:32px;">
                        <h2 style="margin:0 0 12px;font-size:22px;color:#111827;">Verify your email address</h2>

                        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
                          Use the verification code below to complete your Dealio account registration.
                        </p>

                        <div style="padding:20px 12px;text-align:center;background-color:#f3f6ff;border:1px solid #dbe5ff;border-radius:8px;">
                          <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:1.5px;color:#6b7280;text-transform:uppercase;">
                            Your verification code
                          </p>
                          <p style="margin:0;font-size:34px;font-weight:700;letter-spacing:8px;color:#2563eb;">
                            ${otp}
                          </p>
                        </div>

                        <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">
                          This code expires in <strong>3 minutes</strong>. For your security, do not share it with anyone.
                        </p>

                        <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#6b7280;">
                          If you did not request this code, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 32px;text-align:center;background-color:#f9fafb;border-top:1px solid #e5e7eb;">
                        <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;">
                          © 2026 Dealio. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });

    } catch {
      throw new AppError("Failed to send verification email", 502);
    }
  };
}

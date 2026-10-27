import nodemailer, { type Transporter } from "nodemailer";
import { AppError } from "../../../../shared/errors/app-error";

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
                <meta name="color-scheme" content="light" />
                <title>Verify your email - Dealio</title>
                </head>

                <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#172033;">

                <!-- Inbox preview -->
                <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
                    Your Dealio verification code expires in 3 minutes.
                </div>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                    style="background-color:#f4f6f8;">
                    <tr>
                    <td align="center" style="padding:24px 12px;">

                        <!-- Email container -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                        style="width:100%;max-width:480px;background-color:#ffffff;border-radius:12px;overflow:hidden;">

                        <!-- Header -->
                        <tr>
                            <td align="left" style="padding:18px 24px;background-color:#263746;">
                            <h1 style="margin:0;font-size:26px;line-height:32px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">
                                Dealio
                            </h1>
                            </td>
                        </tr>

                        <!-- Main content -->
                        <tr>
                            <td style="padding:32px 28px 28px;">

                            <h2 style="margin:0 0 12px;text-align:center;font-size:24px;line-height:32px;font-weight:700;color:#172033;">
                                Verify your email
                            </h2>

                            <p style="margin:0 0 24px;text-align:center;font-size:15px;line-height:24px;color:#52647a;">
                                Confirm your email address to complete your Dealio account registration.
                            </p>

                            <!-- OTP container -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                                style="background-color:#f6f9fc;border:1px solid #d5e0ec;border-radius:10px;">
                                <tr>
                                <td align="center" style="padding:24px 12px;">

                                    <p style="margin:0 0 14px;font-size:12px;line-height:18px;font-weight:600;letter-spacing:1.5px;color:#355982;">
                                    YOUR VERIFICATION CODE
                                    </p>

                                    <p style="margin:0;font-size:34px;line-height:42px;font-weight:700;letter-spacing:8px;color:#355982;">
                                    ${otp}
                                    </p>

                                    <p style="margin:16px 0 0;font-size:13px;line-height:20px;color:#52647a;">
                                    This code expires in
                                    <strong style="color:#355982;">3 minutes</strong>.
                                    </p>

                                </td>
                                </tr>
                            </table>

                            <!-- Security message -->
                            <p style="margin:22px 0 0;text-align:center;font-size:14px;line-height:22px;color:#52647a;">
                                For your security, never share this code with anyone.
                            </p>

                            <p style="margin:18px 0 0;text-align:center;font-size:12px;line-height:20px;color:#7a8498;">
                                If you did not request this code, you can safely ignore this email.
                            </p>

                            </td>
                        </tr>

                        <!-- Compact footer -->
                        <tr>
                            <td style="padding:18px 16px;background-color:#263746;">

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>

                                <!-- Copyright on the left -->
                                <td align="left" valign="middle"
                                    style="font-size:12px;line-height:18px;color:#e1e8ef;">
                                    &copy; 2026 Dealio. All rights reserved.
                                </td>

                                <!-- Social icons on the right -->
                                <td align="right" valign="middle">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>

                                        <!-- Instagram -->
                                        <td style="padding-left:8px;">
                                        <a href="https://www.instagram.com/sin4n_x4?xtok=MWlvYzhzMTZsenl6aw%3D%3D"
                                            target="_blank"
                                            aria-label="Instagram"
                                            style="text-decoration:none;">
                                            <table role="presentation" width="34" height="34"
                                            cellspacing="0" cellpadding="0" border="0"
                                            style="background-color:#405366;border-radius:50%;">
                                            <tr>
                                                <td width="34" height="34" align="center" valign="middle">
                                                <img
                                                    src="https://cdn.simpleicons.org/instagram/FFFFFF"
                                                    width="16"
                                                    height="16"
                                                    alt="Instagram"
                                                    style="display:block;width:16px;height:16px;border:0;outline:none;"
                                                />
                                                </td>
                                            </tr>
                                            </table>
                                        </a>
                                        </td>

                                        <!-- LinkedIn: text-based icon, no external image -->
                                        <td style="padding-left:8px;">
                                        <a href="https://www.linkedin.com/in/muhammed-sinan-kp-853057383"
                                            target="_blank"
                                            aria-label="LinkedIn"
                                            style="text-decoration:none;">
                                            <table role="presentation" width="34" height="34"
                                            cellspacing="0" cellpadding="0" border="0"
                                            style="background-color:#405366;border-radius:50%;">
                                            <tr>
                                                <td width="34" height="34" align="center" valign="middle"
                                                style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:34px;color:#ffffff;">
                                                in
                                                </td>
                                            </tr>
                                            </table>
                                        </a>
                                        </td>

                                        <!-- GitHub -->
                                        <td style="padding-left:8px;">
                                        <a href="https://github.com/Sinan-kp10"
                                            target="_blank"
                                            aria-label="GitHub"
                                            style="text-decoration:none;">
                                            <table role="presentation" width="34" height="34"
                                            cellspacing="0" cellpadding="0" border="0"
                                            style="background-color:#405366;border-radius:50%;">
                                            <tr>
                                                <td width="34" height="34" align="center" valign="middle">
                                                <img
                                                    src="https://cdn.simpleicons.org/github/FFFFFF"
                                                    width="17"
                                                    height="17"
                                                    alt="GitHub"
                                                    style="display:block;width:17px;height:17px;border:0;outline:none;"
                                                />
                                                </td>
                                            </tr>
                                            </table>
                                        </a>
                                        </td>

                                    </tr>
                                    </table>
                                </td>

                                </tr>
                            </table>

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

    } catch{
      throw new AppError("Failed to send verification email", 502);
    }
  };
}

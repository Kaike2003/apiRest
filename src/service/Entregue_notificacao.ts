import nodemailer from "nodemailer"
export default class Entregue_notificacao {

    public enviar_sms_usuario(email: string, nome: string, telefone: number, nome_documento: string) {

        const transporter_email = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_NODEMAILER,
                pass: process.env.PASS_NODEMAILER
            }
        })

        async function enviar_email() {
            const info = await transporter_email.sendMail({
                from: `${email} from ${process.env.USER_NODEMAILER}`,
                to: `${email}`,
                subject: "Documento confirmado.",
                html: `<!DOCTYPE html>
                <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en-GB">
                
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
                    <style>
                        * {
                            box-sizing: border-box;
                        }
                
                        body {
                            margin: 0;
                            padding: 0;
                        }
                
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: inherit !important;
                        }
                
                        #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                        }
                
                        p {
                            line-height: inherit
                        }
                
                        .desktop_hide,
                        .desktop_hide table {
                            mso-hide: all;
                            display: none;
                            max-height: 0px;
                            overflow: hidden;
                        }
                
                        .image_block img+div {
                            display: none;
                        }
                
                        @media (max-width:620px) {
                
                            .desktop_hide table.icons-inner,
                            .social_block.desktop_hide .social-table {
                                display: inline-block !important;
                            }
                
                            .icons-inner {
                                text-align: center;
                            }
                
                            .icons-inner td {
                                margin: 0 auto;
                            }
                
                            .mobile_hide {
                                display: none;
                            }
                
                            .row-content {
                                width: 100% !important;
                            }
                
                            .stack .column {
                                width: 100%;
                                display: block;
                            }
                
                            .mobile_hide {
                                min-height: 0;
                                max-height: 0;
                                max-width: 0;
                                overflow: hidden;
                                font-size: 0px;
                            }
                
                            .desktop_hide,
                            .desktop_hide table {
                                display: table !important;
                                max-height: none !important;
                            }
                
                            .row-3 .column-1 .block-1.heading_block h1 {
                                font-size: 28px !important;
                            }
                
                            .row-4 .column-1 .block-2.paragraph_block td.pad>div,
                            .row-4 .column-1 .block-3.paragraph_block td.pad>div,
                            .row-4 .column-1 .block-4.paragraph_block td.pad>div {
                                font-size: 12px !important;
                            }
                
                            .row-4 .column-1 .block-2.paragraph_block td.pad {
                                padding: 5px 20px !important;
                            }
                
                            .row-3 .column-1 .block-2.paragraph_block td.pad>div {
                                font-size: 15px !important;
                            }
                
                            .row-3 .column-1 .block-2.paragraph_block td.pad {
                                padding: 15px 20px !important;
                            }
                
                            .row-4 .column-1 .block-3.paragraph_block td.pad,
                            .row-4 .column-1 .block-4.paragraph_block td.pad {
                                padding: 10px 20px !important;
                            }
                
                            .row-2 .column-1 {
                                padding: 0 !important;
                            }
                
                            .row-3 .column-1 {
                                padding: 15px 0 !important;
                            }
                        }
                    </style>
                </head>
                
                <body style="margin: 0; background-color: #ecefe6; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecefe6; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecefe6; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                    <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad">
                                                                                <div></div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecefe6; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                    <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad">
                                                                                <div></div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ecefe6; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-top: 20px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                    <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad" style="padding-left:20px;padding-right:20px;padding-top:10px;text-align:center;width:100%;">
                                                                            <h3 style="margin: 0; color: #000000; direction: ltr; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 27.599999999999998px;"><span class="tinyMce-placeholder">Olá ${nome}, sobre o documento ${nome_documento}.</span></h3>
                            
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                        <tr>
                                                                            <td class="pad" style="padding-bottom:15px;padding-left:40px;padding-right:40px;padding-top:15px;">
                                                                                <div style="color:#1e2e2a;direction:ltr;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;font-size:18px;font-weight:300;letter-spacing:1px;line-height:150%;text-align:justify;mso-line-height-alt:27px;">
                                                                                    <p style="margin: 0;">Felizmente o dono do documento que deste como achado na Suchen ele confirmou o seu documento segundo os requisitos da Sucen, então podes entrar em contacto com o dono do documento para fazeres a devolução do mesmo, contacta ele/a pelo seu número de telefone. A Suchen agradece.</p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="button_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;text-align:center;">
                                                                                <div class="alignment" align="center"><!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.example.com" style="height:33px;width:116px;v-text-anchor:middle;" arcsize="61%" stroke="false" fillcolor="#35524a">
                <w:anchorlock/>
                <v:textbox inset="0px,0px,0px,0px">
                <center style="color:#ecefe6; font-family:Tahoma, Verdana, sans-serif; font-size:18px">
                <![endif]--><a  style="text-decoration:none;display:inline-block;color:#ecefe6;background-color:#35524a;border-radius:20px;width:auto;border-top:0px solid transparent;font-weight:300;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:3px;padding-bottom:3px;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;font-size:18px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:18px;display:inline-block;letter-spacing:1px;"><span style="word-break: break-word; line-height: 27px;">${telefone}</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #3d5a30; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-top: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                    <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                        <tr>
                                                                            <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                                <div style="color:#ffffff;direction:ltr;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;font-size:12px;font-weight:300;letter-spacing:1px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                                                                    <p style="margin: 0;">© SUCHEN 2024</p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- End -->
                </body>
                
                </html>`
            })

            console.log(`Estado do email enviado`, info.messageId)
        }

        enviar_email().catch(console.error)


    }

}
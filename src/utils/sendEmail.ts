import sgMail, {MailDataRequired} from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface SendConfig {
	to: string;
	subject: string;
	html: string;
	text: string;
}

interface ISendEmail {
	noReplay({to, subject, html, text}: SendConfig): Promise<void>;
}

interface TemplateMail {
	html: string;
	text: string
}

class SendEmail implements ISendEmail {
	
	private _header(): TemplateMail {
		return {
			html: '<center><h2><strong>Pm2Painel</strong></h2>',
			text: 'Pm2Painel \n'
		};
	}
	private _footer(): TemplateMail {
		return {
			html: '<br /><strong>from Pm2Painel</strong></center>',
			text: '\n\nfrom Pm2Painel'
		};
	}

	async noReplay({to, subject, html, text}: SendConfig): Promise<void> {
		const msg: MailDataRequired = {
			to,
			from: 'Pm2Painel <noreply@pm2painel.mh4sh.dev>',
			subject,
			text: `${this._header().text}${text}${this._footer().text}`,
			html: `${this._header().html}${html}${this._footer().html}`,
		  };

		  await sgMail
		  .send(msg);
	}
};

export default SendEmail;
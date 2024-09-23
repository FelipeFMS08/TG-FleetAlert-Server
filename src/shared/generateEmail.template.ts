export function generateEmailBody(type: string, content: string): string {
    const header = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notificação</title>
        <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #303030;
            color: #ffffff;
            text-align: center;
            font-size: 1rem; 
        }
        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            color: #303030;
            border: 1px solid #fdaaaa; 
            border-radius: 8px;
            padding: 0;
        }
        .header {
            background-color: #dc2626e6; 
            color: #ffffff;
            padding: 1rem; 
            border-radius: 8px 8px 0 0;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
        }
        .header h1 {
            font-size: 1.5rem; 
            margin: 0;
        }
        .email-content {
            padding: 1rem;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
        }
        p {
            font-size: 1rem; 
            line-height: 1.6;
            color: #303030;
        }
        a {
            color: #dc2626e6;
            text-decoration: none;
            font-weight: bold;
        }
        .button {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background-color: #dc2626e6;
            color: #ffffff;
            border-radius: 4px;
            text-decoration: none;
            font-size: 1rem; 
        }
        .footer {
            margin-top: 1.5rem;
            font-size: 0.875rem; 
            color: #bbbbbb;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
        }

        @media (max-width: 600px) {
            body {
                font-size: 0.875rem;
            }
            .header h1 {
                font-size: 1.25rem; 
            }
            .email-content {
                padding: 1rem;
            }
            .button {
                font-size: 0.875rem; 
            }
            .footer {
                font-size: 0.75rem;
            }
        }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Notificação</h1>
            </div>
            <div class="email-content">
    `;

    const footer = `
            <span class="footer">
                <p style="color: #bbb">Se você não solicitou esta ação, por favor ignore este e-mail.</p>
                <p style="color: #bbb">Equipe FleetAlert</p>
            </span>
    </body>
    </html>
    `;

    let bodyContent = '';

    if (type === 'senha') {
        bodyContent = `
            <p>Olá,</p>
            <p>Você solicitou o seu primeiro acesso. Aqui está a sua senha temporária:</p>
            <p style="font-size: 1.25rem; font-weight: bold; color: #dc2626e6;">${content}</p>
        `;
    } else if (type === 'recuperacao') {
        bodyContent = `
            <p>Olá,</p>
            <p>Clique no botão abaixo para redefinir sua senha:</p>
            <a href="${content}" class="button">Recuperar Senha</a>
        `;
    } else {
        bodyContent = '<p>Tipo de e-mail não reconhecido.</p>';
    }

    return header + bodyContent + footer;
}

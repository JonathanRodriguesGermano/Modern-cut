# 💈 Aparatus - SaaS de Gestão para Barbearias com IA

![Banner do Projeto](/public/banner.png)
## 📋 Sobre o Projeto

O **Aparatus** é uma plataforma SaaS Full Stack desenvolvida para modernizar a experiência de agendamento em barbearias. O grande diferencial do projeto é a integração com Inteligência Artificial Generativa para facilitar a interação com o cliente.

O sistema permite que usuários agendem cortes, escolham profissionais e realizem pagamentos de forma transparente, tudo otimizado para dispositivos móveis (Mobile First).

## ✨ Funcionalidades Principais

-   🤖 **Agend.ia (AI Assistant):** Chatbot inteligente alimentado pelo **Google Gemini 2.0 Flash** que entende linguagem natural para verificar disponibilidade e realizar agendamentos.
-   📅 **Agendamento em Tempo Real:** Sistema robusto de verificação de conflito de horários.
-   💳 **Pagamentos Integrados:** Checkout seguro e gestão de assinaturas via **Stripe**.
-   🔐 **Autenticação Moderna:** Sistema de login seguro utilizando **BetterAuth**.
-   🎨 **UI/UX Premium:** Interface construída com **shadcn/ui** e **Tailwind CSS**, focada em usabilidade e acessibilidade.
-   📱 **Totalmente Responsivo:** Design pensado primariamente para a experiência mobile.

## 🚀 Tech Stack

Este projeto utiliza as tecnologias mais recentes do ecossistema React:

-   **Frontend:** [Next.js 14+](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes:** [shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/)
-   **Backend:** Next.js Server Actions, [Prisma ORM](https://www.prisma.io/)
-   **Database:** PostgreSQL (Neon/Supabase/Local)
-   **Auth:** [BetterAuth](https://www.better-auth.com/)
-   **AI:** [Vercel AI SDK](https://sdk.vercel.ai/), Google Gemini 2.0 Flash
-   **Pagamentos:** [Stripe SDK](https://stripe.com/)

## 📸 Screenshots

<details>
  <summary>Clique para ver mais telas</summary>

  <br> <h3>Tela de Home</h3>
  <img src="/.github/assets/Home.png" alt="Home" width="100%" />

  <br> <h3>Tela de Barbearia</h3>
  <img src="/.github/assets/Barbearia.png" alt="Barbearia" width="100%" />

  <br> <h3>Tela de Agendamento</h3>
  <img src="/.github/assets/Agendamento.png" alt="Agendamento" width="100%" />

  <br> <h3>Tela de Chat</h3>
  <img src="/.github/assets/Chat.png" alt="Chat" width="100%" />

  <br> <h3>Tela de Reservas</h3>
  <img src="/.github/assets/Reserva.png" alt="Reserva" width="100%" />

  <br> <h3>Tela de Endereço</h3>
  <img src="/.github/assets/LocalReserva.png" alt="Endereço" width="100%" />
</details>

## 🔧 Como Rodar Localmente

Pré-requisitos: Node.js (v18+) e gerenciador de pacotes (pnpm, npm ou yarn).

1. **Clone o repositório**
   ```bash
   git clone https://github.com/JonathanRodriguesGermano/Modern-cut.git
   cd Modern-cut
   ```

2. **Instale as dependências**
    ```bash
   pnpm install
   ou npm install
    ```

3. **Configure as Variáveis de Ambiente crie o arquivo .env**
    ```bash
    DATABASE_URL="postgresql://..."
    BETTER_AUTH_SECRET="sua_secret_aqui"

    # Stripe
    STRIPE_SECRET_KEY="sk_test_..."
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."

    # Google AI
    GOOGLE_GENERATIVE_AI_API_KEY="sua_chave_gemini"
    ```

4. **Configure o Banco de Dados**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5. **Execute o servidor de desenvolvimento**
    ```bash
    npm run dev
    ou yarn dev
    ```
## 🧪 Webhooks (Stripe)

Para testar os pagamentos localmente, utilize a CLI do Stripe:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um Pull Request.

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Feito com 💜 por Jonatan Germano

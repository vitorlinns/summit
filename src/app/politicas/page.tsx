'use client';

import React from 'react';
import styles from './page.module.css';

export default function PoliticasPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>Políticas & Termos</h1>
            <p className={styles.lastUpdated}>Última atualização: 16 de Maio de 2026</p>
          </header>

          <section className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>1. Política de Privacidade</h2>
            <p className={styles.text}>
              Na Summit, a privacidade e a segurança dos dados de nossos clientes são fundamentais. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
            </p>
            <p className={styles.text}>
              Coletamos informações apenas quando necessário para fornecer nossos serviços de curadoria imobiliária, incluindo:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Dados de contato (nome, e-mail, telefone).</li>
              <li className={styles.listItem}>Preferências de imóveis e investimentos.</li>
              <li className={styles.listItem}>Documentação necessária para transações imobiliárias seguras.</li>
            </ul>
            <p className={styles.text}>
              Seis dados são armazenados em ambiente seguro e nunca são compartilhados com terceiros sem seu consentimento explícito, exceto quando exigido por lei ou necessário para a conclusão de uma transação solicitada por você.
            </p>

            <h2 className={styles.sectionTitle}>2. Termos de Uso</h2>
            <p className={styles.text}>
              Ao acessar o portal Summit, você concorda em cumprir estes termos de serviço e todas as leis e regulamentos aplicáveis.
            </p>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: '500' }}>Uso de Licença</h3>
            <p className={styles.text}>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Summit, apenas para visualização transitória pessoal e não comercial.
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>Modificar ou copiar os materiais de arquitetura e design.</li>
              <li className={styles.listItem}>Usar os materiais para qualquer finalidade comercial ou para exibição pública.</li>
              <li className={styles.listItem}>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site.</li>
            </ul>

            <h2 className={styles.sectionTitle}>3. Isenção de Responsabilidade</h2>
            <p className={styles.text}>
              Os materiais no site da Summit são fornecidos 'como estão'. A Summit não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização ou adequação a um fim específico.
            </p>
            <p className={styles.text}>
              Além disso, a Summit não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
            </p>

            <h2 className={styles.sectionTitle}>4. LGPD</h2>
            <p className={styles.text}>
              Estamos em total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Você tem o direito de solicitar o acesso, retificação ou exclusão de seus dados pessoais a qualquer momento através de nossos canais de atendimento.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

import type { FC } from "react";
import { PageHeader } from "../components/layout";

const TermsOfService: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Terms of Service"
        description="Last updated: August 30, 2025"
      />
      <div className="prose dark:prose-invert max-w-none">
        <h2>1. Agreement to Terms</h2>
        <p>
          By using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.
        </p>
        <h2>2. The Service</h2>
        <p>
          The Service is an AI-powered tool that screens job candidates based on their resumes and the job descriptions you provide. The Service provides a report with a recommendation, but the ultimate hiring decision is yours.
        </p>
        <h2>3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <h2>4. User Conduct</h2>
        <p>
          You agree not to use the Service to:
        </p>
        <ul>
          <li>Violate any law or regulation.</li>
          <li>Infringe the rights of any third party, including without limitation, intellectual property, privacy, or contractual rights.</li>
          <li>Upload or transmit any material that is defamatory, obscene, or otherwise objectionable.</li>
          <li>Transmit any viruses, worms, or other malicious software.</li>
        </ul>
        <h2>5. Intellectual Property</h2>
        <p>
          The Service and its original content, features and functionality are and will remain the exclusive property of AI Screening Agent and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AI Screening Agent.
        </p>
        <h2>6. Disclaimer</h2>
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
        </p>
        <p>
          AI Screening Agent does not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
        </p>
        <h2>7. Limitation of Liability</h2>
        <p>
          In no event shall AI Screening Agent, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
        </p>
        <h2>8. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
        </p>
        <h2>9. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us:
        </p>
        <ul>
          <li>By email: charan.cvs@gmail.com</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfService;

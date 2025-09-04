import type { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Container } from "../components/layout";

const terms = [
  {
    title: "1. Agreement to Terms",
    content: (
      <p>
        By using our Service, you agree to be bound by these Terms. If you do
        not agree to these Terms, do not use the Service.
      </p>
    ),
  },
  {
    title: "2. The Service",
    content: (
      <p>
        The Service is an AI-powered tool that screens job candidates based on
        their resumes and the job descriptions you provide. The Service provides
        a report with a recommendation, but the ultimate hiring decision is
        yours.
      </p>
    ),
  },
  {
    title: "3. User Accounts",
    content: (
      <p>
        When you create an account with us, you must provide us with
        information that is accurate, complete, and current at all times.
        Failure to do so constitutes a breach of the Terms, which may result in
        immediate termination of your account on our Service.
      </p>
    ),
  },
  {
    title: "4. User Conduct",
    content: (
      <>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Violate any law or regulation.</li>
          <li>
            Infringe the rights of any third party, including without
            limitation, intellectual property, privacy, or contractual rights.
          </li>
          <li>
            Upload or transmit any material that is defamatory, obscene, or
            otherwise objectionable.
          </li>
          <li>Transmit any viruses, worms, or other malicious software.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Intellectual Property",
    content: (
      <p>
        The Service and its original content, features and functionality are
        and will remain the exclusive property of AI Screening Agent and its
        licensors. The Service is protected by copyright, trademark, and other
        laws of both the United States and foreign countries. Our trademarks
        and trade dress may not be used in connection with any product or
        service without the prior written consent of AI Screening Agent.
      </p>
    ),
  },
  {
    title: "6. Disclaimer",
    content: (
      <>
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The
          Service is provided without warranties of any kind, whether express
          or implied, including, but not limited to, implied warranties of
          merchantability, fitness for a particular purpose, non-infringement
          or course of performance.
        </p>
        <p>
          AI Screening Agent does not warrant that a) the Service will function
          uninterrupted, secure or available at any particular time or
          location; b) any errors or defects will be corrected; c) the Service
          is free of viruses or other harmful components; or d) the results of
          using the Service will meet your requirements.
        </p>
      </>
    ),
  },
  {
    title: "7. Limitation of Liability",
    content: (
      <p>
        In no event shall AI Screening Agent, nor its directors, employees,
        partners, agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from (i) your access to or use of or
        inability to access or use the Service; (ii) any conduct or content of
        any third party on the Service; (iii) any content obtained from the
        Service; and (iv) unauthorized access, use or alteration of your
        transmissions or content, whether based on warranty, contract, tort
        (including negligence) or any other legal theory, whether or not we
        have been informed of the possibility of such damage, and even if a
        remedy set forth herein is found to have failed of its essential
        purpose.
      </p>
    ),
  },
  {
    title: "8. Governing Law",
    content: (
      <p>
        These Terms shall be governed and construed in accordance with the laws
        of [Your State/Country], without regard to its conflict of law
        provisions.
      </p>
    ),
  },
  {
    title: "9. Changes",
    content: (
      <p>
        We reserve the right, at our sole discretion, to modify or replace
        these Terms at any time. If a revision is material we will provide at
        least 30 days' notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole
        discretion.
      </p>
    ),
  },
  {
    title: "10. Contact Us",
    content: (
      <>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li>By email: charan.cvs@gmail.com</li>
        </ul>
      </>
    ),
  },
];

const TermsOfService: FC = () => {
  return (
    <Container className="py-8">
      <div className="text-center mt-12 mb-4">
        <div className="container mx-auto px-6 pt-8 pb-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
              Terms of Service
            </h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Last updated: August 30, 2025
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {terms.map((term, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{term.title}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              {term.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default TermsOfService;

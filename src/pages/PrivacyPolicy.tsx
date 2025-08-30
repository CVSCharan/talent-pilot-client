import type { FC } from "react";
import { PageHeader } from "../components/layout";

const PrivacyPolicy: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Privacy Policy"
        description="Last updated: August 30, 2025"
      />
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Your privacy is important to us. It is AI Screening Agent's policy to
          respect your privacy regarding any information we may collect from you
          across our website,{" "}
          <a href="https://talent-pilot.charan-cvs.dev/">
            https://talent-pilot.charan-cvs.dev/
          </a>
          , and other sites we own and operate.
        </p>
        <h2>1. Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>
          We may collect personal information that you voluntarily provide to us
          when you register on the website, express an interest in obtaining
          information about us or our products and services, when you
          participate in activities on the website, or otherwise when you
          contact us.
        </p>
        <p>
          The personal information that we collect depends on the context of
          your interactions with us and the website, the choices you make, and
          the products and features you use. The personal information we collect
          may include the following:
        </p>
        <ul>
          <li>
            <strong>Contact Information:</strong> Name, email address, and other
            similar contact data.
          </li>
          <li>
            <strong>Authentication Information:</strong> Usernames, passwords,
            and other similar information used for authentication and account
            access.
          </li>
          <li>
            <strong>Job and Candidate Data:</strong> Job descriptions, resumes,
            and any other information you provide for the purpose of candidate
            screening.
          </li>
        </ul>
        <h3>Usage Data</h3>
        <p>
          We may also collect information that your browser sends whenever you
          visit our website or when you access the service by or through a
          mobile device.
        </p>
        <p>
          This Usage Data may include information such as your computer's
          Internet Protocol address (e.g. IP address), browser type, browser
          version, the pages of our service that you visit, the time and date of
          your visit, the time spent on those pages, unique device identifiers
          and other diagnostic data.
        </p>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect or receive:</p>
        <ul>
          <li>
            <strong>To provide and maintain our Service:</strong> including to
            monitor the usage of our Service.
          </li>
          <li>
            <strong>To manage Your Account:</strong> to manage your registration
            as a user of the Service. The Personal Data you provide can give you
            access to different functionalities of the Service that are
            available to you as a registered user.
          </li>
          <li>
            <strong>For the performance of a contract:</strong> the development,
            compliance and undertaking of the purchase contract for the
            products, items or services you have purchased or of any other
            contract with us through the Service.
          </li>
          <li>
            <strong>To contact You:</strong> To contact you by email, telephone
            calls, SMS, or other equivalent forms of electronic communication,
            such as a mobile application's push notifications regarding updates
            or informative communications related to the functionalities,
            products or contracted services, including the security updates,
            when necessary or reasonable for their implementation.
          </li>
          <li>
            <strong>
              To provide You with news, special offers and general information
            </strong>{" "}
            about other goods, services and events which we offer that are
            similar to those that you have already purchased or enquired about
            unless you have opted not to receive such information.
          </li>
          <li>
            <strong>For other purposes:</strong> We may use your information for
            other purposes, such as data analysis, identifying usage trends,
            determining the effectiveness of our promotional campaigns and to
            evaluate and improve our Service, products, services, marketing and
            your experience.
          </li>
        </ul>
        <h2>3. Sharing Your Information</h2>
        <p>
          We may share your personal information in the following situations:
        </p>
        <ul>
          <li>
            <strong>With Service Providers:</strong> We may share your personal
            information with Service Providers to monitor and analyze the use of
            our service, to contact you.
          </li>
          <li>
            <strong>For business transfers:</strong> We may share or transfer
            your personal information in connection with, or during negotiations
            of, any merger, sale of company assets, financing, or acquisition of
            all or a portion of our business to another company.
          </li>
          <li>
            <strong>With your consent:</strong> We may disclose your personal
            information for any other purpose with your consent.
          </li>
        </ul>
        <h2>4. Data Retention</h2>
        <p>
          We will retain your personal information only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use your information to the extent necessary to comply with
          our legal obligations (for example, if we are required to retain your
          data to comply with applicable laws), resolve disputes, and enforce
          our legal agreements and policies.
        </p>
        <h2>5. Security of Your Information</h2>
        <p>
          The security of your personal information is important to us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage is 100% secure. While we strive to use
          commercially acceptable means to protect your personal information, we
          cannot guarantee its absolute security.
        </p>
        <h2>6. Your Data Protection Rights</h2>
        <p>
          Depending on your location, you may have the following rights
          regarding your personal information:
        </p>
        <ul>
          <li>
            The right to access, update or delete the information we have on
            you.
          </li>
          <li>The right of rectification.</li>
          <li>The right to object.</li>
          <li>The right of restriction.</li>
          <li>The right to data portability.</li>
          <li>The right to withdraw consent.</li>
        </ul>
        <h2>7. Children's Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone
          under the age of 13. If you are a parent or guardian and you are aware
          that your child has provided us with Personal Data, please contact us.
          If we become aware that we have collected Personal Data from anyone
          under the age of 13 without verification of parental consent, we take
          steps to remove that information from our servers.
        </p>
        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>
          We will let you know via email and/or a prominent notice on our
          Service, prior to the change becoming effective and update the "Last
          updated" date at the top of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact
          us:
        </p>
        <ul>
          <li>By email: charan.cvs@gmail.com</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

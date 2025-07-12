import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GDPR Compliance - Diamond Art',
  description: 'Information about our compliance with the General Data Protection Regulation (GDPR).',
};

export default function GDPRCompliance() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-6">GDPR Compliance</h1>
      <p className="text-muted-foreground mb-8">Last updated: July 10, 2025</p>
      
      <section className="mb-8">
        <p className="mb-4">
          At Diamond Art, we are committed to protecting your personal data and respecting your privacy in compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679, a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Our Commitment to GDPR</h2>
        <p className="mb-4">We recognize our obligations in updating and expanding our program to meet the requirements of GDPR. Diamond Art is dedicated to safeguarding the personal information under our remit and in developing a data protection regime that is effective, fit for purpose, and demonstrates an understanding of, and appreciation for the new Regulation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Your Rights Under GDPR</h2>
        <p className="mb-4">The GDPR provides the following rights for individuals:</p>
        
        <div className="space-y-6">
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">1. The Right to Be Informed</h3>
            <p>You have the right to be informed about the collection and use of your personal data.</p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">2. The Right of Access</h3>
            <p>You have the right to access your personal data and supplementary information.</p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">3. The Right to Rectification</h3>
            <p>You have the right to have inaccurate personal data rectified, or completed if it is incomplete.</p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">4. The Right to Erasure</h3>
            <p>Also known as &quot;the right to be forgotten&quot;, you have the right to have personal data erased.</p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">5. The Right to Restrict Processing</h3>
            <p>You have the right to request the restriction or suppression of your personal data.</p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">6. The Right to Data Portability</h3>
            <p>You have the right to obtain and reuse your personal data for your own purposes across different services.</p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">7. The Right to Object</h3>
            <p>You have the right to object to the processing of your personal data in certain circumstances.</p>
          </div>
          
          <div className="bg-muted/30 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">8. Rights in Relation to Automated Decision Making and Profiling</h3>
            <p>You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Collect and Use Data</h2>
        <p className="mb-4">We collect information to provide better services to all our users. The types of personal information we collect, and how we collect it, depends on how you use our services. We collect information in the following ways:</p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Information You Provide to Us</h3>
            <p className="pl-4">When you create an account, purchase a product, or communicate with us, we collect personal information such as your name, email address, and payment information.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">Information We Collect Automatically</h3>
            <p className="pl-4">We collect information about your interactions with our services, including the type of device you use, your IP address, and your activities on our site.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">Information From Third Parties</h3>
            <p className="pl-4">We may receive information about you from third parties, such as social media services, that you use to access our services.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing</h2>
        <p className="mb-4">We only process your personal information when we have a legal basis to do so. The legal bases depend on the services you use and how you use them. This means we collect and use your information only where:</p>
        
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>We need it to provide you the services, including to operate the services, provide customer support, and protect the safety and security of the services;</li>
          <li>It satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote the services, and to protect our legal rights and interests;</li>
          <li>You give us consent to do so for a specific purpose; or</li>
          <li>We need to process your data to comply with a legal obligation.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Transfers</h2>
        <p className="mb-4">Your information, including personal data that we collect from you, may be transferred to, stored at, and processed by us and other third parties outside the country in which you reside, including, but not limited to the United States, where data protection and privacy regulations may not offer the same level of protection as in other parts of the world.</p>
        <p>By using our services, you agree to this transfer, storing, or processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy and the GDPR.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
        <p className="mb-4">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk. You should only access the services within a secure environment.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Data Protection Officer</h2>
        <p>We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation to this GDPR compliance notice. If you have any questions about this notice, including any requests to exercise your legal rights, please contact the DPO using the details set out below.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p className="mb-4">If you have any questions about this GDPR Compliance page or our privacy practices, please contact our Data Protection Officer:</p>
        
        <address className="not-italic bg-muted/30 p-6 rounded-lg inline-block">
          <strong>Data Protection Officer</strong><br />
          Diamond Art Inc.<br />
          123 Artisan Way<br />
          Creative City, CA 90210<br />
          United States<br />
          Email: <a href="mailto:dpo@diamondart.com" className="text-primary hover:underline">dpo@diamondart.com</a>
        </address>
        
        <div className="mt-6 p-6 bg-primary/5 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">EU Representative</h3>
          <p className="mb-4">As required by Article 27 of the GDPR, we have appointed an EU representative to act as our data protection agent. Our nominated EU representative is:</p>
          
          <address className="not-italic">
            <strong>GDPR-Rep.eu</strong><br />
            Attn: Diamond Art Inc.<br />
            c/o Maetzler Rechtsanwalts GmbH &amp; Co KG<br />
            Schellinggasse 3/10<br />
            1010 Vienna, Austria<br />
            Email: <a href="mailto:diamondart.inc@gdpr-rep.com" className="text-primary hover:underline">diamondart.inc@gdpr-rep.com</a>
          </address>
          
          <p className="mt-4 text-sm text-muted-foreground">
            When contacting our EU representative, please include the following in the subject line: &quot;DPO - Diamond Art Inc.&quot; to ensure your request is handled properly.
          </p>
        </div>
      </section>
    </article>
  );
}

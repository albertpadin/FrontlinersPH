import React from 'react';

import Layout from '@layouts/default';
import SEO from '@components/seo';
import NurseSvg from '@assets/svg/nurse.svg';
import VirusSvg from '@assets/svg/virus.svg';

const PrivacyPage = () => (
  <Layout>
    <SEO title="Privacy Page" />

    <div className="privacy-policy">
      <h1>#FrontlinersPH Privacy Policy</h1>
      <p>
        We understand the value of the data privacy and information we use for
        #FrontlinersPH.As such, this privacy policy explains our process and
        purpose for certain data to be stored, shown and summarized. We
        recommend you reading this policy for you to understand who we are, how
        we collect and share data on this website.{' '}
      </p>

      <h2>Who We Are</h2>
      <p>
        #FrontlinersPH’s primary purpose is to create an online platform where
        hospitals and medical facilities in the Philippines can state what they
        need (PPEs etc.) and for donors to have a clear view of the places that
        need help. This website will be used as tracking for beneficiaries
        specifically for front-liners: (medical staff, hospitals, medical
        agencies, safety and security officers, etc.) and donors who want to
        extend support for the people fighting against COVID-19.
      </p>

      <h2>How We Collect Information</h2>
      <ul>
        <li>
          <h3>Accounts</h3>
          <p>
            Users who want to input data for donation or request must register
            with Facebook to submit a request. We will not be storing account
            information such as your username, email address and password on the
            website. All logins will pass through Facebook.
          </p>
        </li>
        <li>
          <h3>Donations and Support Requests</h3>
          <p>
            Each user who has logged in can add a new request. This data will be
            tracked and summarized on the website. This information can be
            accessed by the general public. #FrontlinersPH only display the
            total count of donations vs. requests.{' '}
          </p>
        </li>
        <li>
          <h3>Information on Beneficiaries</h3>
          <p>
            #FrontlinersPh has researched the hospitals in the country. All
            details about hospitals and persons to contact (location, name of
            the hospital, materials and equipment needed, contact number) are
            freely shared and are open to the public. Additional hospitals and
            beneficiaries can be added by users should there be missing
            information or entities.{' '}
          </p>
        </li>
      </ul>

      <h2>Third-party links</h2>
      <p>
        Occasionally, at our discretion, we may include or offer third-party
        products or services on our website. These third-party sites have
        separate and independent privacy policies. We, therefore, have no
        responsibility or liability for the content and activities of these
        linked sites. Nonetheless, we seek to protect the integrity of our site
        and welcome any feedback about these sites.
      </p>
      <p>
        If you have any questions or concerns about our use of information, feel
        free to contact us.{' '}
      </p>
    </div>
    <div className="privacy-policy-footer">
      <div className="footer-title">
        <h1>JOIN THE FIGHT</h1>
        <h1>
          <span>THEY SAVE US,</span>
          <span>LET'S PROTECT THEM</span>
        </h1>
      </div>
      <div className="nurse-svg">
        <NurseSvg />
      </div>
      <div className="virus-svg">
        <VirusSvg width="500px" height="500px" />
      </div>
    </div>
  </Layout>
);

export default PrivacyPage;

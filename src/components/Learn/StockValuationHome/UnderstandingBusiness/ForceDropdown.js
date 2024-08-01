import React from "react";
import { FirstForce } from "./Forces/FirstForce";
import { SecondForce } from "./Forces/SecondForce";
import { ThirdForce } from "./Forces/ThreeForce";
import { FourthForce } from "./Forces/FourthForce";
import { FifthForce } from "./Forces/FiveForce";
import styles from "./ForceDropdown.module.css";

export function ForceDropdown() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Porter&apos;s Five Forces Analysis</div>

      {/* First Force */}
      <div className={styles.section}>
        <h5>1. The Threat of New Entrants</h5>
        <p>
          The risk of new competitors entering the market and potentially taking
          away customers and market share from existing companies.
        </p>
        <div className={styles.forceContent}>
          <FirstForce />
        </div>
      </div>

      {/* Second Force */}
      <div className={styles.section}>
        <h5>2. The Bargaining Power of Buyers</h5>
        <p>
          The ability of customers to influence pricing and terms by demanding
          better products or lower prices from sellers.
        </p>
        <div className={styles.forceContent}>
          <SecondForce />
        </div>
      </div>

      {/* Third Force */}
      <div className={styles.section}>
        <h5>3. The Bargaining Power of Suppliers</h5>
        <p>
          The ability of suppliers to impact the costs and availability of
          resources or inputs that companies need to produce goods or services.
        </p>
        <div className={styles.forceContent}>
          <ThirdForce />
        </div>
      </div>

      {/* Fourth Force */}
      <div className={styles.section}>
        <h5>4. The Threat of Substitute Products or Services</h5>
        <p>
          The possibility of alternative products or services fulfilling the
          same needs as the ones offered by existing companies and attracting
          customers away from them.
        </p>
        <div className={styles.forceContent}>
          <FourthForce />
        </div>
      </div>

      {/* Fifth Force */}
      <div className={styles.section}>
        <h5>5. Competitive Rivalry among Existing Competitors</h5>
        <p>
          The intensity of competition between existing companies in a market,
          which can lead to price wars, aggressive marketing, and a constant
          struggle for market dominance.
        </p>
        <div className={styles.forceContent}>
          <FifthForce />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import branches from '../../data/branches.json';

function BranchesSection() {
  return (
    <section id="branches" className="wvdi-branches">
      <h2 className="wvdi-section-title wvdi-section-title-underline">Our Branches</h2>
      <p className="wvdi-branches-description">
        Visit us at any of our convenient locations across Negros Island:
      </p>

      <div className="wvdi-branches-list">
        {branches.map((branch) => (
          <div key={branch.id} className="wvdi-branch-item">
            <div className="wvdi-branch-info">
              <h3>{branch.name}</h3>
              <p>{branch.address}</p>
              <p>
                <strong>Phone:</strong> {branch.phones.join(' / ')}
              </p>
            </div>
            <div className="wvdi-branch-map">
              <iframe
                src={branch.mapEmbed}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`WVDI ${branch.name} Location`}
                aria-label={`Google Maps showing WVDI ${branch.name} location`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BranchesSection;

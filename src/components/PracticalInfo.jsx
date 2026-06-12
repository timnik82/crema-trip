import { practicalSections } from '../data/practical.js';
import { Accordion } from './ui/Accordion.jsx';

export function PracticalInfo() {
  return (
    <section id="practical" className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Pocket reference</p>
        <h2>Practical Info</h2>
        <p>Small things that make the week easier when you are already hot, hungry, or late.</p>
      </div>
      <div className="accordion-list">
        {practicalSections.map((section, index) => (
          <Accordion key={section.id} title={section.title} defaultOpen={index === 0}>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

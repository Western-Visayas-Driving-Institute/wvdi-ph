import data from "../../data/instructors.json";
import Card from "./InstructorCard";

export default function InstructorSection() {
  return (
    <section id="instructors" className="wvdi-section wvdi-instructors-full wvdi-section-bg-gray scroll-mt-20">
      <h2 className="wvdi-section-title wvdi-section-title-underline">Meet Our Instructors</h2>
      <p className="wvdi-section-sub">All trainers are LTO-accredited for both theoretical and practical courses.</p>
      <div className="wvdi-grid">
        {data.map(i => <Card key={i.id} p={i} />)}
      </div>
    </section>
  );
}

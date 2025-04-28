import React, { useRef, useState } from "react";
import coursesData from "../data/courses.json";

const GROUPS = [
  { id: "theoretical", label: "Theoretical" },
  { id: "practical", label: "Practical" },
  { id: "driving-lessons", label: "Driving Lessons" },
  { id: "other", label: "Other Services" },
];

function groupCourses(data, groupId) {
  return data.filter((c) => c.group === groupId);
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function CoursesServicesSection({ onBookNow }) {
  const refs = {
    theoretical: useRef(null),
    practical: useRef(null),
    "driving-lessons": useRef(null),
    other: useRef(null),
  };
  const [openAccordion, setOpenAccordion] = useState(null);
  const isMobile = useIsMobile();

  const handleNavClick = (id) => {
    refs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAccordionToggle = (id) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section id="courses-services" className="wvdi-section scroll-mt-20">
      <header className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#141f54] mb-2 tracking-tight drop-shadow-sm">
          Courses & Services
        </h2>
        <p className="text-lg text-[#141f54] font-medium mb-6 max-w-2xl mx-auto">
          From beginner theory to master-level road skills—choose the package that fits you.
        </p>
      </header>

      {/* Nav-pills (desktop/tablet only) */}
      {!isMobile && (
        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8" aria-label="Course groups">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              className="wvdi-pill font-semibold py-2 rounded-full border border-[#e0e0e0] bg-white text-[#0D47A1] hover:bg-[#e3eaf6] focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition"
              onClick={() => handleNavClick(g.id)}
              type="button"
            >
              {g.label}
            </button>
          ))}
        </nav>
      )}

      {/* Accordion (mobile only) */}
      {isMobile && (
        <div className="wvdi-accordion mb-8" aria-label="Course groups">
          {GROUPS.map((g) => (
            <div key={g.id} className="mb-2 border border-[#e0e0e0] rounded-lg bg-[#f8f9fa]">
              <button
                className="w-full flex justify-between items-center px-4 py-3 font-semibold text-[#0D47A1] focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                aria-expanded={openAccordion === g.id}
                aria-controls={`panel-${g.id}`}
                id={`accordion-header-${g.id}`}
                onClick={() => handleAccordionToggle(g.id)}
                type="button"
              >
                {g.label}
                <span className={`ml-3 transition-transform ${openAccordion === g.id ? 'rotate-90' : ''}`}>▶</span>
              </button>
              <div
                id={`panel-${g.id}`}
                role="region"
                aria-labelledby={`accordion-header-${g.id}`}
                className={`overflow-hidden transition-all duration-300 ${openAccordion === g.id ? 'max-h-[1200px] py-2 px-2' : 'max-h-0 p-0'}`}
                style={{ background: '#fff' }}
                ref={refs[g.id]}
              >
                {openAccordion === g.id && (
                  <div>
                    {/* Render the content for this group */}
                    {g.id === "theoretical" && (
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Theoretical Courses</h3>
                        <div className="grid gap-4">
                          {groupCourses(coursesData, "theoretical").map((course) => (
                            <div
                              key={course.id}
                              className="wvdi-card flex flex-col rounded-[12px] shadow-sm border border-[#e0e0e0] p-5 bg-white mb-2"
                              itemScope
                              itemType="https://schema.org/Offer"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-[#0D47A1]">{course.title}</span>
                                <span
                                  className="price-tag"
                                  itemProp="price"
                                  content={course.price}
                                  style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                                >
                                  ₱ {course.price?.toLocaleString("en-PH")}
                                </span>
                                <meta itemProp="priceCurrency" content="PHP" />
                                <meta itemProp="availability" content="https://schema.org/InStock" />
                              </div>
                              {course.hours && (
                                <span className="sr-only">{course.hours} hours course</span>
                              )}
                              {course.note && (
                                <div className="text-xs text-gray-600 mt-1">{course.note}</div>
                              )}
                              <button
                                className="wvdi-btn mt-3 self-end"
                                onClick={() => onBookNow && onBookNow(course.id)}
                                type="button"
                              >
                                Book now
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {g.id === "practical" && (
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Practical Driving Courses (LTO-compliant)</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-[340px] w-full bg-white rounded-[12px] shadow-sm mb-2">
                            <thead>
                              <tr className="bg-[#e3eaf6]">
                                <th className="py-2 px-4 text-left">Vehicle</th>
                                <th className="py-2 px-4 text-left">Hours</th>
                                <th className="py-2 px-4 text-left">Price (₱)</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {groupCourses(coursesData, "practical").map((course) => (
                                <tr key={course.id} itemScope itemType="https://schema.org/Offer">
                                  <td className="py-2 px-4 font-medium text-[#0D47A1]">{course.vehicle}</td>
                                  <td className="py-2 px-4">
                                    <span>{course.hours} h</span>
                                    <span className="sr-only">{course.hours} hours course</span>
                                  </td>
                                  <td className="py-2 px-4">
                                    <span
                                      className="price-tag"
                                      itemProp="price"
                                      content={course.price}
                                      style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                                    >
                                      {course.price.toLocaleString("en-PH")}
                                    </span>
                                    <meta itemProp="priceCurrency" content="PHP" />
                                    <meta itemProp="availability" content="https://schema.org/InStock" />
                                  </td>
                                  <td className="py-2 px-4">
                                    <button
                                      className="wvdi-btn"
                                      onClick={() => onBookNow && onBookNow(course.id)}
                                      type="button"
                                    >
                                      Book now
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          PDC price already covers vehicle rental, insurance, fuel, and instructor.
                        </div>
                      </div>
                    )}
                    {g.id === "driving-lessons" && (
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Driving Lessons – Skill Packages</h3>
                        <div className="grid gap-4">
                          {groupCourses(coursesData, "driving-lessons").map((course) => (
                            <div
                              key={course.id}
                              className="wvdi-card flex flex-col rounded-[12px] shadow-sm border border-[#e0e0e0] p-5 bg-white mb-2"
                              itemScope
                              itemType="https://schema.org/Offer"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-[#0D47A1]">{course.title}</span>
                                <span
                                  className="price-tag"
                                  itemProp="price"
                                  content={course.price}
                                  style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                                >
                                  ₱ {course.price?.toLocaleString("en-PH")}
                                </span>
                                <meta itemProp="priceCurrency" content="PHP" />
                                <meta itemProp="availability" content="https://schema.org/InStock" />
                              </div>
                              {course.hours && (
                                <span className="sr-only">{course.hours} hours course</span>
                              )}
                              <button
                                className="wvdi-btn mt-3 self-end"
                                onClick={() => onBookNow && onBookNow(course.id)}
                                type="button"
                              >
                                Book now
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {g.id === "other" && (
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Other Services</h3>
                        <div className="grid gap-4">
                          {groupCourses(coursesData, "other").map((course) => (
                            <div
                              key={course.id}
                              className="wvdi-card flex flex-col rounded-[12px] shadow-sm border border-[#e0e0e0] p-5 bg-white mb-2"
                              itemScope
                              itemType="https://schema.org/Offer"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-[#0D47A1]">{course.title}</span>
                                <span
                                  className="price-tag"
                                  itemProp="price"
                                  content={course.price}
                                  style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                                >
                                  {course.price ? `₱ ${course.price.toLocaleString("en-PH")}` : "Price on request"}
                                </span>
                                <meta itemProp="priceCurrency" content="PHP" />
                                <meta itemProp="availability" content="https://schema.org/InStock" />
                              </div>
                              <button
                                className="wvdi-btn mt-3 self-end"
                                onClick={() => onBookNow && onBookNow(course.id)}
                                type="button"
                              >
                                Book now
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content blocks (desktop/tablet only) */}
      {!isMobile && (
        <div>
          {/* Theoretical */}
          <article id="theoretical" ref={refs.theoretical} className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Theoretical Courses</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {groupCourses(coursesData, "theoretical").map((course) => (
                <div
                  key={course.id}
                  className="wvdi-card flex flex-col rounded-[12px] shadow-sm border border-[#e0e0e0] p-5 bg-white mb-2"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#0D47A1]">{course.title}</span>
                    <span
                      className="price-tag"
                      itemProp="price"
                      content={course.price}
                      style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                    >
                      ₱ {course.price?.toLocaleString("en-PH")}
                    </span>
                    <meta itemProp="priceCurrency" content="PHP" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                  </div>
                  {course.hours && (
                    <span className="sr-only">{course.hours} hours course</span>
                  )}
                  {course.note && (
                    <div className="text-xs text-gray-600 mt-1">{course.note}</div>
                  )}
                  <button
                    className="wvdi-btn mt-3 self-end"
                    onClick={() => onBookNow && onBookNow(course.id)}
                    type="button"
                  >
                    Book now
                  </button>
                </div>
              ))}
            </div>
          </article>

          {/* Practical */}
          <article id="practical" ref={refs.practical} className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Practical Driving Courses (LTO-compliant)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-[340px] w-full bg-white rounded-[12px] shadow-sm mb-2">
                <thead>
                  <tr className="bg-[#e3eaf6]">
                    <th className="py-2 px-4 text-left">Vehicle</th>
                    <th className="py-2 px-4 text-left">Hours</th>
                    <th className="py-2 px-4 text-left">Price (₱)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {groupCourses(coursesData, "practical").map((course) => (
                    <tr key={course.id} itemScope itemType="https://schema.org/Offer">
                      <td className="py-2 px-4 font-medium text-[#0D47A1]">{course.vehicle}</td>
                      <td className="py-2 px-4">
                        <span>{course.hours} h</span>
                        <span className="sr-only">{course.hours} hours course</span>
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className="price-tag"
                          itemProp="price"
                          content={course.price}
                          style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                        >
                          {course.price.toLocaleString("en-PH")}
                        </span>
                        <meta itemProp="priceCurrency" content="PHP" />
                        <meta itemProp="availability" content="https://schema.org/InStock" />
                      </td>
                      <td className="py-2 px-4">
                        <button
                          className="wvdi-btn"
                          onClick={() => onBookNow && onBookNow(course.id)}
                          type="button"
                        >
                          Book now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              PDC price already covers vehicle rental, insurance, fuel, and instructor.
            </div>
          </article>

          {/* Driving Lessons */}
          <article id="driving-lessons" ref={refs["driving-lessons"]} className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Driving Lessons – Skill Packages</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {groupCourses(coursesData, "driving-lessons").map((course) => (
                <div
                  key={course.id}
                  className="wvdi-card flex flex-col rounded-[12px] shadow-sm border border-[#e0e0e0] p-5 bg-white mb-2"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#0D47A1]">{course.title}</span>
                    <span
                      className="price-tag"
                      itemProp="price"
                      content={course.price}
                      style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                    >
                      ₱ {course.price?.toLocaleString("en-PH")}
                    </span>
                    <meta itemProp="priceCurrency" content="PHP" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                  </div>
                  {course.hours && (
                    <span className="sr-only">{course.hours} hours course</span>
                  )}
                  <button
                    className="wvdi-btn mt-3 self-end"
                    onClick={() => onBookNow && onBookNow(course.id)}
                    type="button"
                  >
                    Book now
                  </button>
                </div>
              ))}
            </div>
          </article>

          {/* Other Services */}
          <article id="other" ref={refs.other} className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-[#0D47A1]">Other Services</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {groupCourses(coursesData, "other").map((course) => (
                <div
                  key={course.id}
                  className="wvdi-card flex flex-col rounded-[12px] shadow-sm border border-[#e0e0e0] p-5 bg-white mb-2"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#0D47A1]">{course.title}</span>
                    <span
                      className="price-tag"
                      itemProp="price"
                      content={course.price}
                      style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700 }}
                    >
                      {course.price ? `₱ ${course.price.toLocaleString("en-PH")}` : "Price on request"}
                    </span>
                    <meta itemProp="priceCurrency" content="PHP" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                  </div>
                  <button
                    className="wvdi-btn mt-3 self-end"
                    onClick={() => onBookNow && onBookNow(course.id)}
                    type="button"
                  >
                    Book now
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}

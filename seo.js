/* Keep query-based college and district pages distinct. */
(() => {
 const params = new URLSearchParams(window.location.search);
 const page = window.location.pathname.split('/').pop();
 if (!['engineering-colleges.html', 'college-details.html'].includes(page)) return;
 const data = typeof DISTRICTS_DATA !== 'undefined' ? DISTRICTS_DATA : [];
 const slug = params.get('district') || (page === 'college-details.html' ? 'chengalpattu' : '');
 const district = data.find(d => d.slug === slug);
 if (!district) return;
 let title = `Engineering Colleges in ${district.name} | EduAdmissions`;
 let description = `Browse engineering colleges in ${district.name}, Tamil Nadu. Explore institution types and locations, and check college profiles before making an admission enquiry.`;
 const canonical = new URL(page, 'https://eduadmissions.in/');
 canonical.searchParams.set('district', district.slug);
 if (page === 'college-details.html') {
  const college = district.colleges.find(c => c.sno === Number(params.get('college') || 1));
  if (!college) return;
  title = `${college.name} — Admission & Profile | EduAdmissions`;
  description = `Explore ${college.name} in ${district.name}, Tamil Nadu. View the college profile and location; confirm current fees, eligibility and admission dates with the institution.`;
  canonical.searchParams.set('college', college.sno);
 }
 document.title = title;
 document.querySelector('meta[name="description"]').content = description;
 document.querySelector('meta[property="og:title"]').content = title;
 document.querySelector('meta[property="og:description"]').content = description;
 let link = document.querySelector('link[rel="canonical"]');
 if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
 link.href = canonical.href;
})();

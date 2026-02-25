'use client';

import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export function RichEditor() {
  const [html, setHtml] = useState(sampleText);

  function onChange(e: { target: { value: string } }) {
    setHtml(e.target.value);
  }

  // TODO: Delete this entire Rich text thing. We will use just a plain Textarea.

  return (
    <div className="mx-10 my-10">
      <Editor value={html} onChange={onChange} />
    </div>
  );
}

const sampleText = `
Email: Inquiry about Graduate Admission and Research Opportunities.<br><div><br></div><div>Subject: Prospective Graduate Student Inquiry - [Your Name] - [Program Name]
<br>
<br>
Dear Professor [Professor's Last Name],</div><div>&nbsp;
<br>My name is [Your Name], and I am a highly motivated final-year undergraduate student at [Your Current University] majoring in [Your Major]. I am writing to express my strong interest in pursuing a [Master's/Ph.D.] degree in [Program Name] at [University Name], and specifically in the research conducted in your lab.</div><div><br></div><div>I would be grateful if you could let me know whether you anticipate accepting new graduate students for the [Fall/Spring] [Year] admission cycle and if you are open to discussing potential research opportunities. I have attached my CV and transcript for your review.
<br>
<br>
Thank you very much for your time and consideration. I look forward to hearing from you.

<br><br></div><div>
Sincerely,

<br>
[Your Name]</div><div>[Your Email Address]</div><div>[Your Phone Number (Optional)]</div>
`;

import React, { FormEvent, useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Borchini Realty | Contact Us';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = `New Contact Form Message from ${formData.name}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`;

    const mailtoLink = `mailto:WestviewHomeSales@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-8">
      <section className="pb-4 pt-2 md:pb-8 md:pt-6">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Contact Us</h1>
          <p className="max-w-[700px] text-base sm:text-lg text-gray-600">Get in touch with our team about properties in Westview, Poinciana.</p>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 order-2 md:order-1">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
              <input
                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                id="name"
                placeholder="Your name"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input
                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full"
                id="phone"
                placeholder="(123) 456-7890"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                id="message"
                rows={5}
                placeholder="Write your message here..."
                required
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white shadow h-9 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700"
              type="submit"
            >
              Send Message
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Your message will be sent to the Westview Home Sales team.
            </p>

            <div className="mt-6 text-center py-3 px-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                This form will open your email application to send a message directly to our team.
              </p>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-5 order-1 md:order-2">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Office</h2>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <MapPin size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-gray-600">
                <a href="https://borchinirealty.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Borchini Realty
                </a><br />
                <a href="https://www.google.com/maps/place/345+Sorrento+Rd,+Kissimmee,+FL+34759" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  345 Sorrento Rd.<br />
                  Kissimmee, FL 34759
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Phone size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:4075227375" className="hover:underline">(407) 522-7375</a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Mail size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-gray-600 break-words">
                <a href="mailto:WestviewHomeSales@gmail.com" className="hover:underline">
                  WestviewHomeSales@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Office Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: By appointment only
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 py-8 bg-[#fafaec]">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 border-b-2 border-gray-300 pb-2 text-center tracking-wide">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-24 h-24 overflow-hidden rounded-full mb-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                    width={96}
                    height={96}
                  />
                </div>
                <h4 className="font-semibold text-center">{member.name}</h4>
                <p className="text-sm text-center">{member.title}</p>
                <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="text-sm text-center hover:underline">
                  {member.phone}
                </a>
                <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:underline">
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const teamMembers = [
  {
    name: "Susan Borchini",
    title: "Broker/Owner",
    phone: "(407) 791-1789",
    email: "sborchini@gmail.com",
    image: "https://westviewhomesales.com/team/susan_borchini.jpg"
  },
  {
    name: "Charlie Borchini",
    title: "Broker Associate",
    phone: "(407) 552-7375",
    email: "charles.borchini@gmail.com",
    image: "https://westviewhomesales.com/team/charlie_borchini.jpg"
  },
  {
    name: "Yamile Varrone",
    title: "Realtor",
    phone: "(315) 534-1966",
    email: "ycVarrone@gmail.com",
    image: "https://westviewhomesales.com/team/yamile_varrone.jpg"
  },
  {
    name: "Edie Stauffer",
    title: "Realtor",
    phone: "(407) 791-1789",
    email: "EdieStauffer@gmail.com",
    image: "https://westviewhomesales.com/team/edie_stauffer.jpg"
  },
  {
    name: "Valerie Williams",
    title: "Realtor",
    phone: "(407) 910-2609",
    email: "ValWilliamsRealtor@gmail.com",
    image: "https://westviewhomesales.com/team/valerie_williams.jpg"
  },
  {
    name: "Cherie Pontes",
    title: "Broker Associate",
    phone: "(305) 282-0527",
    email: "cherie34759@gmail.com",
    image: "https://westviewhomesales.com/team/cherie_pontes.jpg"
  },
  {
    name: "Dale Pautz",
    title: "Realtor",
    phone: "(407) 791-1789",
    email: "DeanPautz@gmail.com",
    image: "https://westviewhomesales.com/team/dale_pautz.jpg"
  },
  {
    name: "Sheila Choromanski",
    title: "Broker Associate",
    phone: "(203) 631-8306",
    email: "SheilaChor@gmail.com",
    image: "https://westviewhomesales.com/team/sheila_choromanski.jpg"
  },
  {
    name: "Heather Hayes",
    title: "Realtor",
    phone: "(703) 282-7753",
    email: "HeatherHayes222@gmail.com",
    image: "https://westviewhomesales.com/team/heather_hayes.jpg"
  }
];

import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export const UsefulInfoPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Borchini Realty | Useful Information';
  }, []);

  const openMap = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Useful Information</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Find important contacts and resources for the Westview community and surrounding Poinciana area.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Osceola County Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Osceola County</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <h3 className="font-medium">County Administration</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('1 Courthouse Sq, Kissimmee, FL 34741')}>
                  1 Courthouse Sq.<br />
                  Kissimmee, FL 34741
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-343-2300'}`} className="hover:underline"><strong>{formatPhoneNumber('407-343-2300')}</strong></a>
                </p>
                <a
                  href="https://www.osceola.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Clerk of the Court</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-742-3500'}`} className="hover:underline"><strong>{formatPhoneNumber('407-742-3500')}</strong></a>
                </p>
                <a
                  href="https://osceolaclerk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Property Appraiser</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-742-2000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-742-2000')}</strong></a>
                </p>
                <a
                  href="https://www.property-appraiser.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Tax Collector</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-742-4000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-742-4000')}</strong></a>
                </p>
                <a
                  href="https://osceolataxcollector.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Sheriff's Office</h3>
                <p className="text-sm text-gray-600">Non-Emergency: <a href={`tel:${'407-348-2222'}`} className="hover:underline"><strong>{formatPhoneNumber('407-348-2222')}</strong></a></p>
                <a
                  href="https://www.osceolasheriff.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Polk County Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Polk County</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <h3 className="font-medium">County Administration</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('330 W Church St Bartow, FL 33830')}>
                  330 W. Church St.<br />
                  Bartow, FL 33830
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'863-534-6000'}`} className="hover:underline"><strong>{formatPhoneNumber('863-534-6000')}</strong></a>
                </p>
                <a
                  href="https://www.polk-county.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Clerk of the Court</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'863-534-4000'}`} className="hover:underline"><strong>{formatPhoneNumber('863-534-4000')}</strong></a>
                </p>
                <a
                  href="https://www.polkcountyclerk.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Property Appraiser</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'863-534-4777'}`} className="hover:underline"><strong>{formatPhoneNumber('863-534-4777')}</strong></a>
                </p>
                <a
                  href="https://www.polkpa.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Tax Collector</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'863-534-4700'}`} className="hover:underline"><strong>{formatPhoneNumber('863-534-4700')}</strong></a>
                </p>
                <a
                  href="https://osceolataxcollector.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Sheriff's Office</h3>
                <p className="text-sm text-gray-600">Non-Emergency: <a href={`tel:${'863-298-6200'}`} className="hover:underline"><strong>{formatPhoneNumber('863-298-6200')}</strong></a></p>
                <a
                  href="https://www.polksheriff.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* HOA Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-black text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">HOA</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <h3 className="font-medium">Westview South CDD</h3>
                <a
                  href="https://westviewsouthcdd.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Taylor Morrison</h3>
                <a
                  href="https://www.taylormorrison.com/fl/orlando/kissimmee/the-townhomes-at-westview/available-homes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Lennar</h3>
                <a
                  href="https://www.lennar.com/new-homes/florida/orlando/kissimmee/westview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Utilities Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-amber-500 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Utilities</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {/* Reordered Utilities Links */}
              <li>
                <h3 className="font-medium">Duke Energy</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'800-700-4434'}`} className="hover:underline"><strong>{formatPhoneNumber('800-700-4434')}</strong></a>
                </p>
                <p className="text-sm text-gray-600">Electricity Services</p>
                <a
                  href="https://www.duke-energy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Toho Water Authority</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-944-5000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-944-5000')}</strong></a>
                </p>
                <p className="text-sm text-gray-600">Water & Wastewater Services</p>
                <a
                  href="https://www.tohowater.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Frontier Communications</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'888-616-6305'}`} className="hover:underline"><strong>{formatPhoneNumber('888-616-6305')}</strong></a>
                </p>
                <a
                  href="https://frontier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Hotwire Communications</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'833-354-2289'}`} className="hover:underline"><strong>{formatPhoneNumber('833-354-2289')}</strong></a>
                </p>
                <a
                  href="https://gethotwired.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Healthcare Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-purple-600 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Healthcare</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {/* Reordered Healthcare Links */}
              <li>
                <h3 className="font-medium">Poinciana Medical Center</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('325 Cypress Pkwy, Kissimmee, FL 34758')}>
                  325 Cypress Pkwy.<br />
                  Kissimmee, FL 34758
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-530-8000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-530-8000')}</strong></a>
                </p>
                <a
                  href="https://www.poincianamedicalcenter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">AdventHealth ER Poinciana</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('4281 Pleasant Hill Rd, Kissimmee, FL 34746')}>
                  4281 Pleasant Hill Rd.<br />
                  Kissimmee, FL 34746
                </p>
                <a
                  href="https://www.adventhealth.com/hospital-and-emergency-room/adventhealth-poinciana-er"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Osceola Regional Medical Center</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('700 W. Oak St, Kissimmee, FL 34741')}>
                  700 W. Oak St.<br />
                  Kissimmee, FL 34741
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-846-4000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-846-4000')}</strong></a>
                </p>
                <a
                  href="https://osceolaregional.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Park Place Behavioral Health Care</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('206 Park Place Blvd, Kissimmee, FL 34741')}>
                  206 Park Place Blvd.<br />
                  Kissimmee, FL 34741
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-846-0023'}`} className="hover:underline"><strong>{formatPhoneNumber('407-846-0023')}</strong></a>
                </p>
                <a
                  href="https://www.ppbh.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-600 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Emergency</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="bg-red-50 p-2 rounded border border-red-100">
                <h3 className="font-bold text-red-800">Emergency: <strong>911</strong></h3>
                <p className="text-sm text-gray-700">For life-threatening emergencies</p>
              </li>
              <li>
                <h3 className="font-medium">Polk County Fire Station #37</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('1201 Cypress Pkwy, Kissimmee, FL 34759')}>
                  1201 Cypress Pkwy.<br />
                  Kissimmee, FL 34759
                </p>
              </li>
              <li>
                <h3 className="font-medium">Osceola County Fire Station #85</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('715 Cypress Pkwy, Kissimmee, FL 34758')}>
                  715 Cypress Pkwy.<br />
                  Kissimmee, FL 34758
                </p>
              </li>
              <li>
                <h3 className="font-medium">Osceola County Fire Station #64</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('3385 Pleasant Hill Rd, Kissimmee, FL, 34746')}>
                  3385 Pleasant Hill Rd.<br />
                  Kissimmee, FL 34746
                </p>
              </li>
              <li>
                <h3 className="font-medium">Sheriff’s Office - Poinciana</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('4547 Pleasant Hill Rd. Kissimmee 34758')}>
                  4547 Pleasant Hill Rd.<br />
                  Kissimmee, FL 34758
                </p>
              </li>
              <li>
                <h3 className="font-medium">Florida Highway Patrol</h3>
                <p className="text-sm text-gray-600">Non-Emergency: <a href={`tel:${'407-737-4000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-737-4000')}</strong></a></p>
              </li>
              <li>
                <h3 className="font-medium">Poison Control</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'800-222-1222'}`} className="hover:underline"><strong>{formatPhoneNumber('800-222-1222')}</strong></a>
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Schools Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-600 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Schools</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li>
                <h3 className="font-medium">Osceola County School District</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('817 Bill Beck Blvd, Kissimmee, FL 34744')}>
                  817 Bill Beck Blvd.<br />
                  Kissimmee, FL 34744
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-870-9000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-870-9000')}</strong></a>
                </p>
                <a
                  href="https://www.osceolaschools.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Polk County Public Schools</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('1915 S Floral Ave, Bartow, FL 33830')}>
                  1915 S. Floral Ave.<br />
                  Bartow, FL 33830
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'863-534-0500'}`} className="hover:underline"><strong>{formatPhoneNumber('863-534-0500')}</strong></a>
                </p>
                <a
                  href="https://www.polkschoolsfl.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Valencia College Poinciana Campus</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('3255 Pleasant Hill Rd, Kissimmee, FL 34746')}>
                  3255 Pleasant Hill Rd.<br />
                  Kissimmee, FL 34746
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-299-5000'}`} className="hover:underline"><strong>{formatPhoneNumber('407-299-5000')}</strong></a>
                </p>
                <a
                  href="https://valenciacollege.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Recreation Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Recreation</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {/* Osceola Library - Poinciana Branch */}
              <li>
                <h3 className="font-medium">Osceola Library - Poinciana Branch</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('101 N. Doverplum Ave. Kissimmee, FL 34758')}>
                  101 N. Doverplum Ave.<br />
                  Kissimmee, FL 34758
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-742-8888'}`} className="hover:underline"><strong>{formatPhoneNumber('407-742-8888')}</strong></a>
                </p>
                <a
                  href="https://www.osceolalibrary.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              {/* Vance Harmon Complex */}
              <li>
                <h3 className="font-medium">Vance Harmon Complex</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('625 Country Club Dr, Kissimmee, FL 34759')}>
                  625 Country Club Dr.<br />
                  Kissimmee, FL 34759
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'863-427-2551'}`} className="hover:underline"><strong>{formatPhoneNumber('863-427-2551')}</strong></a>
                </p>
                <a
                  href="https://www.apvcommunity.com/the-arrington-gymnasium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              <li>
                <h3 className="font-medium">Poinciana Community Park</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('5109 Allegheny Rd, Kissimmee, FL 34759')}>
                  5109 Allegheny Rd.<br />
                  Kissimmee, FL 34759
                </p>
                <p className="text-sm text-gray-600">Playground, sports fields, walking trails</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Transportation Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-orange-500 text-white p-4 flex items-center">
            <h2 className="text-xl font-semibold">Transportation</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {/* Orlando International Airport (MCO) */}
              <li>
                <h3 className="font-medium">Orlando International Airport (MCO)</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-825-2001'}`} className="hover:underline"><strong>{formatPhoneNumber('407-825-2001')}</strong></a>
                </p>
                 <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('1 Jeff Fuqua Blvd. Orlando, FL 32827')}>
                  1 Jeff Fuqua Blvd.<br />
                  Orlando, FL 32827
                </p>
                <p className="text-sm text-gray-600">~35 minutes from Poinciana</p>
                <a
                  href="https://www.orlandoairports.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >Visit Website
                </a>
              </li>
              {/* SunRail - Poinciana Station */}
              <li>
                <h3 className="font-medium">SunRail - Poinciana Station</h3>
                <p className="text-sm text-gray-600 cursor-pointer hover:underline" onClick={() => openMap('5025 S Rail Ave, Kissimmee, FL 34758')}>
                  5025 S. Rail Ave.<br />
                  Kissimmee, FL 34758
                </p>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'855-724-5411'}`} className="hover:underline"><strong>{formatPhoneNumber('855-724-5411')}</strong></a>
                </p>
                <p className="text-sm text-gray-600">Commuter rail service to Orlando</p>
                <a
                  href="https://sunrail.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              {/* LYNX Bus Service */}
              <li>
                <h3 className="font-medium">LYNX Bus Service</h3>
                <p className="text-sm text-gray-600">
                  <a href={`tel:${'407-841-5969'}`} className="hover:underline"><strong>{formatPhoneNumber('407-841-5969')}</strong></a>
                </p>
                <p className="text-sm text-gray-600">Central Florida Regional Transportation Authority Route 601 serves Poinciana area</p>
                <a
                  href="https://www.golynx.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline flex items-center mt-1"
                >
                  Visit Website
                </a>
              </li>
              {/* Rideshare Services */}
              <li>
                <h3 className="font-medium">Rideshare Services</h3>
                <p className="text-sm text-gray-600">
                  <a href="https://www.uber.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Uber</a> and <a href="https://www.lyft.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lyft</a> available throughout the area
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

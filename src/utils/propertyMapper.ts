import { Property } from '../types/property'
import { SoldPropertyData, ActivePropertyData } from '../lib/supabase'

export function mapSoldPropertyToProperty(soldProperty: SoldPropertyData): Property {
  // Generate a unique ID based on address and sold date
  const id = Math.abs(
    (soldProperty.Address + soldProperty["Date Sold"]).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
  )

  // Parse price from string (remove $ and commas)
  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0
    return parseInt(priceStr.replace(/[$,]/g, '')) || 0
  }

  // Parse square feet from string
  const parseSqFt = (sqFtStr: string): number => {
    if (!sqFtStr) return 0
    return parseInt(sqFtStr.replace(/[,]/g, '')) || 0
  }

  // Map model name to image URL
  const getImageUrl = (model: string): string => {
    if (!model) return 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    const modelName = model.replace(/\s+/g, '')
    return `https://westviewhomesales.com/models/${modelName}.png`
  }

  const price = parsePrice(soldProperty["Sold Price"])
  const sqFt = parseSqFt(soldProperty["Square Feet"])
  const pricePerSqFt = sqFt > 0 ? Math.round(price / sqFt) : 0

  return {
    id,
    status: 'SOLD',
    imageUrl: getImageUrl(soldProperty.Model),
    price,
    address: soldProperty.Address || '',
    city: 'Kissimmee',
    state: 'FL',
    zip: '34758',
    beds: soldProperty.Beds || 0,
    baths: soldProperty.Baths || 0,
    sqFt,
    pricePerSqFt,
    yearBuilt: 2024, // Default year
    lotSize: 0.05, // Default lot size
    listedBy: 'Westview',
    listedDate: soldProperty["Date Sold"] || '',
    soldDate: soldProperty["Date Sold"] || '',
    propertyType: 'Single Family'
  }
}

export function mapActivePropertyToProperty(activeProperty: ActivePropertyData): Property {
  console.log('🔄 === MAPPING ACTIVE PROPERTY ===')
  console.log('📥 Raw property data:', activeProperty)
  console.log('🔑 Available keys:', Object.keys(activeProperty))
  
  // Use the ID from the database
  const id = activeProperty.ID || activeProperty.id || Math.random() * 1000000

  // Function to find the best matching column for a value
  const findColumn = (searchTerms: string[]): string | null => {
    const allKeys = Object.keys(activeProperty)
    console.log(`🔍 Searching for column matching: ${searchTerms.join(', ')}`)
    console.log(`📋 Available columns: ${allKeys.join(', ')}`)
    
    for (const term of searchTerms) {
      // Try exact match first (case insensitive)
      const exactMatch = allKeys.find(key => key.toLowerCase() === term.toLowerCase())
      if (exactMatch) {
        console.log(`✅ Found exact match: "${exactMatch}" for term "${term}"`)
        return exactMatch
      }
    }
    
    // Try partial matches
    for (const term of searchTerms) {
      const partialMatch = allKeys.find(key => key.toLowerCase().includes(term.toLowerCase()))
      if (partialMatch) {
        console.log(`✅ Found partial match: "${partialMatch}" for term "${term}"`)
        return partialMatch
      }
    }
    
    console.log(`❌ No match found for any of: ${searchTerms.join(', ')}`)
    return null
  }

  // Enhanced price parsing function
  const parsePrice = (priceStr: any): number => {
    console.log('💰 Parsing price input:', priceStr, 'Type:', typeof priceStr)
    
    if (!priceStr && priceStr !== 0) {
      console.log('❌ No price provided')
      return 0
    }
    
    // If it's already a number, return it
    if (typeof priceStr === 'number') {
      console.log('✅ Price is already a number:', priceStr)
      return Math.round(priceStr)
    }
    
    // Convert to string and clean it
    const str = String(priceStr).trim()
    console.log('🔤 Price as string:', str)
    
    if (str === '' || str === 'null' || str === 'undefined') {
      console.log('❌ Empty or null price string')
      return 0
    }
    
    // Remove all non-numeric characters except decimal points
    const cleaned = str.replace(/[^0-9.]/g, '')
    console.log('🧹 Cleaned price string:', cleaned)
    
    if (cleaned === '') {
      console.log('❌ No numeric characters found')
      return 0
    }
    
    // Parse as float first, then round to integer
    const parsed = parseFloat(cleaned)
    const result = isNaN(parsed) ? 0 : Math.round(parsed)
    
    console.log(`✅ Final price parsing: "${priceStr}" -> "${cleaned}" -> ${parsed} -> ${result}`)
    return result
  }

  // Enhanced square feet parsing function
  const parseSqFt = (sqFtStr: any): number => {
    console.log('📐 === PARSING SQUARE FEET ===')
    console.log('📐 Input value:', sqFtStr)
    console.log('📐 Input type:', typeof sqFtStr)
    console.log('📐 Input as JSON:', JSON.stringify(sqFtStr))
    
    if (!sqFtStr && sqFtStr !== 0) {
      console.log('❌ No sqft provided (null/undefined)')
      return 0
    }
    
    // If it's already a number, return it
    if (typeof sqFtStr === 'number') {
      console.log('✅ SqFt is already a number:', sqFtStr)
      return Math.round(sqFtStr)
    }
    
    // Convert to string and clean it
    const str = String(sqFtStr).trim()
    console.log('🔤 SqFt as string:', `"${str}"`)
    
    if (str === '' || str === 'null' || str === 'undefined') {
      console.log('❌ Empty or null sqft string')
      return 0
    }
    
    // Remove all non-numeric characters (including commas, spaces, etc.)
    const cleaned = str.replace(/[^0-9]/g, '')
    console.log('🧹 Cleaned sqft string:', `"${cleaned}"`)
    
    if (cleaned === '') {
      console.log('❌ No numeric characters found in sqft')
      return 0
    }
    
    const parsed = parseInt(cleaned, 10)
    const result = isNaN(parsed) ? 0 : parsed
    
    console.log(`✅ Final sqft parsing: "${sqFtStr}" -> "${cleaned}" -> ${parsed} -> ${result}`)
    console.log('📐 === END PARSING SQUARE FEET ===')
    return result
  }

  // Enhanced date parsing function
  const parseListedDate = (dateStr: any): string => {
    console.log('📅 === PARSING LISTED DATE ===')
    console.log('📅 Input value:', dateStr)
    console.log('📅 Input type:', typeof dateStr)
    
    if (!dateStr) {
      console.log('❌ No date provided, using current date')
      return new Date().toISOString().split('T')[0]
    }
    
    // Convert to string
    const str = String(dateStr).trim()
    console.log('📅 Date as string:', `"${str}"`)
    
    if (str === '' || str === 'null' || str === 'undefined') {
      console.log('❌ Empty or null date string, using current date')
      return new Date().toISOString().split('T')[0]
    }
    
    try {
      let date: Date
      
      // Handle different date formats
      if (str.includes('/')) {
        // Handle MM/DD/YYYY format
        const [month, day, year] = str.split('/')
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      } else if (str.includes('-')) {
        // Handle YYYY-MM-DD format
        date = new Date(str + 'T12:00:00')
      } else {
        // Try to parse as-is
        date = new Date(str)
      }
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.log('❌ Invalid date, using current date')
        return new Date().toISOString().split('T')[0]
      }
      
      const result = date.toISOString().split('T')[0]
      console.log(`✅ Final date parsing: "${dateStr}" -> ${result}`)
      console.log('📅 === END PARSING LISTED DATE ===')
      return result
    } catch (error) {
      console.log('❌ Error parsing date, using current date:', error)
      return new Date().toISOString().split('T')[0]
    }
  }

  // Try to find price column with more variations
  const priceColumnNames = [
    'List Price', 'list price', 'price', 'Price', 'ListPrice', 'list_price', 
    'Sold Price', 'sold price', 'SoldPrice', 'sold_price',
    'Current Price', 'current price', 'CurrentPrice', 'current_price',
    'asking price', 'Asking Price', 'AskingPrice', 'asking_price'
  ]
  const priceColumn = findColumn(priceColumnNames)
  console.log('💰 Found price column:', priceColumn)
  
  // Try to find square feet column with MANY more variations
  const sqftColumnNames = [
    // Standard variations
    'Square Feet', 'square feet', 'sqft', 'SqFt', 'sq_ft', 'square_feet', 'SquareFeet',
    // With spaces and punctuation
    'Sq Ft', 'sq ft', 'Sq. Ft.', 'sq. ft.', 'Square Ft', 'square ft',
    // Abbreviated
    'sf', 'SF', 'sq', 'SQ',
    // Area variations
    'area', 'Area', 'AREA', 'living area', 'Living Area', 'LivingArea', 'living_area',
    // Size variations
    'size', 'Size', 'SIZE', 'home size', 'Home Size', 'HomeSize', 'home_size',
    // Floor area
    'floor area', 'Floor Area', 'FloorArea', 'floor_area',
    // Interior area
    'interior area', 'Interior Area', 'InteriorArea', 'interior_area',
    // Total area
    'total area', 'Total Area', 'TotalArea', 'total_area',
    // Footage
    'footage', 'Footage', 'FOOTAGE', 'square footage', 'Square Footage', 'SquareFootage', 'square_footage'
  ]
  const sqftColumn = findColumn(sqftColumnNames)
  console.log('📐 Found sqft column:', sqftColumn)

  // Try to find the Listed Date column
  const listedDateColumnNames = [
    'Listed Date', 'listed date', 'ListedDate', 'listed_date',
    'Date Listed', 'date listed', 'DateListed', 'date_listed',
    'List Date', 'list date', 'ListDate', 'list_date',
    'Listing Date', 'listing date', 'ListingDate', 'listing_date',
    'Date', 'date', 'DATE'
  ]
  const listedDateColumn = findColumn(listedDateColumnNames)
  console.log('📅 Found listed date column:', listedDateColumn)

  // Try to find URL columns from Supabase
  const moreDetailsUrlColumnNames = [
    'More Details URL', 'more details url', 'MoreDetailsURL', 'more_details_url',
    'Details URL', 'details url', 'DetailsURL', 'details_url',
    'Listing URL', 'listing url', 'ListingURL', 'listing_url',
    'Property URL', 'property url', 'PropertyURL', 'property_url',
    'URL', 'url', 'Link', 'link'
  ]
  const moreDetailsUrlColumn = findColumn(moreDetailsUrlColumnNames)
  console.log('🔗 Found more details URL column:', moreDetailsUrlColumn)

  const photoGalleryUrlColumnNames = [
    'Photo Gallery URL', 'photo gallery url', 'PhotoGalleryURL', 'photo_gallery_url',
    'Gallery URL', 'gallery url', 'GalleryURL', 'gallery_url',
    'Photos URL', 'photos url', 'PhotosURL', 'photos_url',
    'Images URL', 'images url', 'ImagesURL', 'images_url'
  ]
  const photoGalleryUrlColumn = findColumn(photoGalleryUrlColumnNames)
  console.log('📸 Found photo gallery URL column:', photoGalleryUrlColumn)
  
  // If we still can't find sqft column, let's check all columns that might contain numeric data
  if (!sqftColumn) {
    console.log('🔍 SQFT COLUMN NOT FOUND - CHECKING ALL NUMERIC COLUMNS:')
    const allKeys = Object.keys(activeProperty)
    allKeys.forEach(key => {
      const value = activeProperty[key]
      const isNumeric = !isNaN(Number(value)) && value !== null && value !== ''
      if (isNumeric && Number(value) > 500 && Number(value) < 10000) {
        console.log(`🏠 Potential sqft column "${key}": ${value} (looks like square footage)`)
      }
    })
  }
  
  // Get the actual values
  const priceValue = priceColumn ? activeProperty[priceColumn] : null
  const sqftValue = sqftColumn ? activeProperty[sqftColumn] : null
  const listedDateValue = listedDateColumn ? activeProperty[listedDateColumn] : null
  const moreDetailsUrlValue = moreDetailsUrlColumn ? activeProperty[moreDetailsUrlColumn] : null
  const photoGalleryUrlValue = photoGalleryUrlColumn ? activeProperty[photoGalleryUrlColumn] : null
  
  console.log('💰 Price value from column:', priceValue)
  console.log('📐 SqFt value from column:', sqftValue)
  console.log('📅 Listed date value from column:', listedDateValue)
  console.log('🔗 More details URL value from column:', moreDetailsUrlValue)
  console.log('📸 Photo gallery URL value from column:', photoGalleryUrlValue)
  
  const price = parsePrice(priceValue)
  const sqFt = parseSqFt(sqftValue)
  const listedDate = parseListedDate(listedDateValue)
  const pricePerSqFt = sqFt > 0 && price > 0 ? Math.round(price / sqFt) : 0

  console.log('💰 Final parsed price:', price)
  console.log('📐 Final parsed sqft:', sqFt)
  console.log('📅 Final parsed listed date:', listedDate)
  console.log('💲 Price per sqft:', pricePerSqFt)

  // Map model name to image URL
  const getImageUrl = (model: string): string => {
    if (!model) return 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    const modelName = model.replace(/\s+/g, '')
    return `https://westviewhomesales.com/models/${modelName}.png`
  }

  // Determine builder based on model name or other criteria
  const getBuilder = (model: string): string => {
    if (!model) return 'Westview Builder'
    
    // Map specific models to builders
    const lennarModels = ['Sanibel', 'Siesta', 'Venice', 'Ventura', 'Amalfi', 'Minori', 'Sienna', 'Atlanta', 'Columbia', 'Concord', 'Annapolis', 'Boston', 'Belmont', 'Columbus', 'Edison', 'Georgia', 'Jefferson', 'Bloom', 'Celeste', 'Dawn', 'Eclipse', 'Aspen', 'Discovery', 'Dover', 'Hartford', 'Miramar', 'Sutton']
    const taylorMorrisonModels = ['Anastasia', 'Aruba', 'Barbados', 'Bermuda', 'BocaGrande', 'Captiva', 'Grenada', 'SaintThomas', 'SaintVincent', 'SantaRosa', 'Ambrosia', 'Azalea', 'Cypress', 'Elm', 'Holly', 'Magnolia', 'Maple', 'Redbud', 'Sherwood', 'Spruce', 'Ambra', 'Azzurro', 'Farnese', 'Lazio', 'Letizia', 'Pallazio', 'Hazel', 'Ivy', 'Jasmine', 'Marigold']
    
    const cleanModel = model.replace(/\s+/g, '')
    
    if (lennarModels.includes(cleanModel)) {
      return 'Lennar'
    } else if (taylorMorrisonModels.includes(cleanModel)) {
      return 'Taylor Morrison'
    }
    
    return 'Westview Builder'
  }

  // Parse the address to avoid duplication
  const parseAddress = (addressStr: string): { address: string, city: string, state: string, zip: string } => {
    if (!addressStr) {
      return { address: '', city: 'Kissimmee', state: 'FL', zip: '34758' }
    }
    
    // Check if address already contains city, state, zip
    const fullAddressPattern = /^(.+?),\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})$/
    const match = addressStr.match(fullAddressPattern)
    
    if (match) {
      return {
        address: match[1].trim(),
        city: match[2].trim(),
        state: match[3].trim(),
        zip: match[4].trim()
      }
    }
    
    // If no match, assume it's just the street address
    return {
      address: addressStr.trim(),
      city: 'Kissimmee',
      state: 'FL',
      zip: '34758'
    }
  }

  const addressInfo = parseAddress(activeProperty.Address || '')
  console.log('🏠 Parsed address:', addressInfo)

  // Generate fallback URLs if not found in database
  const generateFallbackUrls = () => {
    const addressSlug = addressInfo.address.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const baseUrl = 'http://borchinirealty.idxbroker.com/idx'
    const listingId = `O${id.toString().padStart(7, '0')}`
    const detailsUrl = `${baseUrl}/details/listing/d003/${listingId}/${addressSlug}-kissimmee-fl`
    const galleryUrl = `${baseUrl}/photogallery/d003/${listingId}`

    return { detailsUrl, galleryUrl }
  }

  const fallbackUrls = generateFallbackUrls()

  // Use URLs from database if available, otherwise use generated fallback URLs
  const moreDetailsUrl = moreDetailsUrlValue && moreDetailsUrlValue.trim() !== '' 
    ? moreDetailsUrlValue.trim() 
    : fallbackUrls.detailsUrl

  const photoGalleryUrl = photoGalleryUrlValue && photoGalleryUrlValue.trim() !== '' 
    ? photoGalleryUrlValue.trim() 
    : fallbackUrls.galleryUrl

  console.log('🔗 Final more details URL:', moreDetailsUrl)
  console.log('📸 Final photo gallery URL:', photoGalleryUrl)

  const mappedProperty: Property = {
    id,
    status: 'ACTIVE',
    imageUrl: getImageUrl(activeProperty.Model),
    price,
    address: addressInfo.address,
    city: addressInfo.city,
    state: addressInfo.state,
    zip: addressInfo.zip,
    beds: activeProperty.Beds || 0,
    baths: activeProperty.Baths || 0,
    sqFt,
    pricePerSqFt,
    yearBuilt: 2025, // Default year for active properties
    lotSize: 0.05, // Default lot size
    listedBy: getBuilder(activeProperty.Model),
    listedDate, // Now using the real listed date from the database
    propertyType: 'Single Family',
    // Use URLs from database or fallback to generated URLs
    moreDetailsUrl,
    photoGalleryUrl
  }

  console.log('✅ === MAPPED PROPERTY RESULT ===')
  console.log('🏠 Final mapped property:', mappedProperty)
  console.log('💰 Price check - Column:', priceColumn, 'Original:', priceValue, 'Parsed:', price)
  console.log('📐 SqFt check - Column:', sqftColumn, 'Original:', sqftValue, 'Parsed:', sqFt)
  console.log('📅 Listed Date check - Column:', listedDateColumn, 'Original:', listedDateValue, 'Parsed:', listedDate)
  console.log('🔗 More Details URL check - Column:', moreDetailsUrlColumn, 'Original:', moreDetailsUrlValue, 'Final:', moreDetailsUrl)
  console.log('📸 Photo Gallery URL check - Column:', photoGalleryUrlColumn, 'Original:', photoGalleryUrlValue, 'Final:', photoGalleryUrl)
  console.log('================================')
  
  return mappedProperty
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface SoldPropertyData {
  ID: number
  "Date Sold": string
  "List Price": string
  "Sold Price": string
  Address: string
  "Square Feet": string
  Model: string
  Beds: number
  Baths: number
  Status: string
}

export interface ActivePropertyData {
  [key: string]: any // Allow any column names since we're not sure of the exact structure
}

export async function fetchSoldProperties(): Promise<SoldPropertyData[]> {
  try {
    console.log('Fetching sold properties from Supabase...')
    
    // Fetch from both tables
    const [{ data: data2024, error: error2024 }, { data: data2025, error: error2025 }] = await Promise.all([
      supabase.from('whs2024').select('*'),
      supabase.from('whs2025').select('*')
    ])

    if (error2024) {
      console.error('Error fetching 2024 data:', error2024)
    }
    
    if (error2025) {
      console.error('Error fetching 2025 data:', error2025)
    }

    // Combine and return the data
    const combinedData = [
      ...(data2024 || []),
      ...(data2025 || [])
    ]

    console.log(`Fetched ${combinedData.length} sold properties`)
    return combinedData
  } catch (error) {
    console.error('Error fetching sold properties:', error)
    return []
  }
}

export async function fetchActiveProperties(): Promise<ActivePropertyData[]> {
  try {
    console.log('🔍 Fetching active properties from Supabase westviewactive table...')
    
    const { data, error } = await supabase
      .from('westviewactive')
      .select('*')
    
    if (error) {
      console.error('❌ Error fetching active properties:', error)
      return []
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} active properties`)
    
    if (data && data.length > 0) {
      console.log('📊 DETAILED DATA ANALYSIS:')
      console.log('='.repeat(50))
      
      // Show all available columns
      const firstProperty = data[0]
      const allColumns = Object.keys(firstProperty)
      console.log('📋 ALL AVAILABLE COLUMNS:', allColumns)
      
      // Show first property with all its data
      console.log('🏠 FIRST PROPERTY COMPLETE DATA:')
      console.log(JSON.stringify(firstProperty, null, 2))
      
      // Check for price-related columns
      const priceColumns = allColumns.filter(col => 
        col.toLowerCase().includes('price') || 
        col.toLowerCase().includes('cost') ||
        col.toLowerCase().includes('amount')
      )
      console.log('💰 PRICE-RELATED COLUMNS:', priceColumns)
      
      // Check for square feet related columns
      const sqftColumns = allColumns.filter(col => 
        col.toLowerCase().includes('sq') || 
        col.toLowerCase().includes('feet') ||
        col.toLowerCase().includes('foot') ||
        col.toLowerCase().includes('area')
      )
      console.log('📐 SQUARE FEET RELATED COLUMNS:', sqftColumns)
      
      // Show sample data for price and sqft columns
      if (priceColumns.length > 0) {
        console.log('💰 PRICE COLUMN VALUES:')
        priceColumns.forEach(col => {
          console.log(`  ${col}:`, firstProperty[col], `(type: ${typeof firstProperty[col]})`)
        })
      }
      
      if (sqftColumns.length > 0) {
        console.log('📐 SQUARE FEET COLUMN VALUES:')
        sqftColumns.forEach(col => {
          console.log(`  ${col}:`, firstProperty[col], `(type: ${typeof firstProperty[col]})`)
        })
      }
      
      // Show first 3 properties for comparison
      console.log('🏘️ FIRST 3 PROPERTIES SUMMARY:')
      data.slice(0, 3).forEach((prop, index) => {
        console.log(`Property ${index + 1}:`)
        console.log(`  ID: ${prop.ID}`)
        console.log(`  Address: ${prop.Address}`)
        console.log(`  All data:`, prop)
        console.log('---')
      })
      
      console.log('='.repeat(50))
    } else {
      console.log('⚠️ No data returned from westviewactive table')
    }
    
    return data || []
  } catch (error) {
    console.error('💥 Error fetching active properties:', error)
    return []
  }
}

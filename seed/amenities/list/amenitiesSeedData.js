const seedData = [
    // Basic
    { "name": "Wi-Fi", "description": "High-speed wireless internet access.", "icon": "wifi", "category": "Basic" },
    { "name": "Air Conditioning", "description": "Temperature control with AC.", "icon": "air-conditioner", "category": "Basic" },
    { "name": "Heating", "description": "Central or room heating system.", "icon": "fire", "category": "Basic" },
    { "name": "Electricity Backup", "description": "Uninterrupted power supply.", "icon": "bolt", "category": "Basic" },
    { "name": "Housekeeping", "description": "Daily room cleaning service.", "icon": "broom", "category": "Basic" },
    { "name": "Toiletries", "description": "Free soap, shampoo, and essentials.", "icon": "soap", "category": "Basic" },
    { "name": "Hot Water", "description": "24/7 hot water supply.", "icon": "shower", "category": "Basic" },
    { "name": "Drinking Water", "description": "Safe filtered drinking water.", "icon": "droplet", "category": "Basic" },
    { "name": "Linen & Towels", "description": "Fresh bed linens and towels.", "icon": "bed", "category": "Basic" },
    { "name": "Iron & Board", "description": "Ironing facilities provided.", "icon": "iron", "category": "Basic" },

    // Room
    { "name": "Television", "description": "Flat-screen TV with cable or streaming.", "icon": "tv", "category": "Room" },
    { "name": "Mini Fridge", "description": "Compact refrigerator for snacks & drinks.", "icon": "fridge", "category": "Room" },
    { "name": "Microwave", "description": "Microwave oven for heating food.", "icon": "microwave", "category": "Room" },
    { "name": "Work Desk", "description": "Dedicated space for work or study.", "icon": "desk", "category": "Room" },
    { "name": "Balcony", "description": "Private balcony with view.", "icon": "balcony", "category": "Room" },
    { "name": "Wardrobe", "description": "Closet or wardrobe for clothes.", "icon": "wardrobe", "category": "Room" },
    { "name": "Safe", "description": "Locker for storing valuables.", "icon": "safe", "category": "Room" },
    { "name": "Coffee Maker", "description": "Machine for making coffee/tea.", "icon": "coffee-maker", "category": "Room" },
    { "name": "Kitchenette", "description": "Small kitchen space with essentials.", "icon": "kitchen", "category": "Room" },
    { "name": "Bedside Lamp", "description": "Reading lamps near bed.", "icon": "lamp", "category": "Room" },

    // Property
    { "name": "Parking", "description": "On-site parking for guests.", "icon": "car", "category": "Property" },
    { "name": "Elevator", "description": "Lift access to all floors.", "icon": "elevator", "category": "Property" },
    { "name": "Laundry", "description": "Self-service or staff laundry facilities.", "icon": "laundry", "category": "Property" },
    { "name": "Security", "description": "24/7 surveillance and security staff.", "icon": "shield", "category": "Property" },
    { "name": "Reception", "description": "Front desk services for guests.", "icon": "reception", "category": "Property" },
    { "name": "Garden", "description": "Outdoor garden area.", "icon": "tree", "category": "Property" },
    { "name": "Terrace", "description": "Shared rooftop or terrace area.", "icon": "building", "category": "Property" },
    { "name": "Luggage Storage", "description": "Facility to store bags securely.", "icon": "suitcase", "category": "Property" },
    { "name": "Pet Friendly", "description": "Pets allowed in property.", "icon": "paw", "category": "Property" },
    { "name": "Smoking Area", "description": "Designated smoking zones.", "icon": "smoking", "category": "Property" },

    // Leisure & Wellness
    { "name": "Swimming Pool", "description": "Outdoor or indoor pool for guests.", "icon": "swimming", "category": "Leisure & Wellness" },
    { "name": "Gym", "description": "Fitness center with equipment.", "icon": "dumbbell", "category": "Leisure & Wellness" },
    { "name": "Spa", "description": "Wellness and relaxation spa services.", "icon": "spa", "category": "Leisure & Wellness" },
    { "name": "Sauna", "description": "Steam and sauna facilities.", "icon": "sauna", "category": "Leisure & Wellness" },
    { "name": "Jacuzzi", "description": "Hot water jacuzzi for relaxation.", "icon": "hot-tub", "category": "Leisure & Wellness" },
    { "name": "Game Room", "description": "Indoor games & entertainment.", "icon": "gamepad", "category": "Leisure & Wellness" },
    { "name": "Playground", "description": "Kids' outdoor play area.", "icon": "slide", "category": "Leisure & Wellness" },
    { "name": "Sports Court", "description": "Tennis, basketball or similar courts.", "icon": "basketball", "category": "Leisure & Wellness" },
    { "name": "Yoga Area", "description": "Dedicated yoga and meditation space.", "icon": "lotus", "category": "Leisure & Wellness" },
    { "name": "Library", "description": "Reading lounge with books.", "icon": "book", "category": "Leisure & Wellness" },

    // Food & Beverage
    { "name": "Restaurant", "description": "On-site restaurant with meals.", "icon": "utensils", "category": "Food & Beverage" },
    { "name": "Bar", "description": "Lounge or bar serving drinks.", "icon": "wine-glass", "category": "Food & Beverage" },
    { "name": "Breakfast", "description": "Complimentary or paid breakfast service.", "icon": "coffee", "category": "Food & Beverage" },
    { "name": "Room Service", "description": "Meals delivered to your room.", "icon": "tray", "category": "Food & Beverage" },
    { "name": "Coffee Shop", "description": "Cafe serving beverages and snacks.", "icon": "coffee-cup", "category": "Food & Beverage" },
    { "name": "Buffet", "description": "Buffet dining service.", "icon": "buffet", "category": "Food & Beverage" },
    { "name": "Banquet Hall", "description": "Hall for large events and dining.", "icon": "hall", "category": "Food & Beverage" },
    { "name": "BBQ Facilities", "description": "Outdoor barbecue setup.", "icon": "grill", "category": "Food & Beverage" },
    { "name": "Vending Machines", "description": "Automated snack & drink machines.", "icon": "vending-machine", "category": "Food & Beverage" },
    { "name": "Mini Bar", "description": "Alcoholic and non-alcoholic minibar.", "icon": "beer", "category": "Food & Beverage" },

    // Business & Events
    { "name": "Meeting Room", "description": "Private meeting spaces with facilities.", "icon": "briefcase", "category": "Business & Events" },
    { "name": "Conference Hall", "description": "Large hall for conferences & events.", "icon": "presentation", "category": "Business & Events" },
    { "name": "Business Center", "description": "Computers, printers, and office tools.", "icon": "printer", "category": "Business & Events" },
    { "name": "Coworking Space", "description": "Shared workspaces for professionals.", "icon": "users", "category": "Business & Events" },
    { "name": "High-speed Internet", "description": "Dedicated business-grade internet.", "icon": "network", "category": "Business & Events" },

    // Accessibility
    { "name": "Wheelchair Access", "description": "Ramps and access for wheelchairs.", "icon": "wheelchair", "category": "Accessibility" },
    { "name": "Accessible Bathroom", "description": "Bathrooms designed for accessibility.", "icon": "bath", "category": "Accessibility" },
    { "name": "Braille Signage", "description": "Signage with braille for visually impaired.", "icon": "braille", "category": "Accessibility" },
    { "name": "Hearing Assistance", "description": "Devices for hearing-impaired guests.", "icon": "ear", "category": "Accessibility" },
    { "name": "Elevator Access", "description": "Accessible lifts with wide doors.", "icon": "elevator", "category": "Accessibility" },

    // Luxury & Premium
    { "name": "Valet Parking", "description": "Professional valet parking service.", "icon": "car-side", "category": "Luxury & Premium" },
    { "name": "Private Pool", "description": "Exclusive private swimming pool.", "icon": "water", "category": "Luxury & Premium" },
    { "name": "Butler Service", "description": "Dedicated personal butler assistance.", "icon": "user-tie", "category": "Luxury & Premium" },
    { "name": "Rooftop Lounge", "description": "Luxury rooftop bar or lounge.", "icon": "building", "category": "Luxury & Premium" },
    { "name": "Helipad", "description": "Private helipad for air travel.", "icon": "helicopter", "category": "Luxury & Premium" },
    { "name": "Limousine Service", "description": "Chauffeur-driven luxury transport.", "icon": "car-limousine", "category": "Luxury & Premium" },
    { "name": "Wine Cellar", "description": "Exclusive collection of wines.", "icon": "wine-bottle", "category": "Luxury & Premium" },
    { "name": "Personal Concierge", "description": "Dedicated concierge for guest services.", "icon": "concierge-bell", "category": "Luxury & Premium" }
]

module.exports = seedData;
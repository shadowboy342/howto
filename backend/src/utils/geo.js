const countryCentroids = {
  مصر: { lat: 26.8206, lng: 30.8025, country: 'Egypt' },
  egypt: { lat: 26.8206, lng: 30.8025, country: 'Egypt' },
  السعودية: { lat: 23.8859, lng: 45.0792, country: 'Saudi Arabia' },
  'saudi arabia': { lat: 23.8859, lng: 45.0792, country: 'Saudi Arabia' },
  الإمارات: { lat: 23.4241, lng: 53.8478, country: 'United Arab Emirates' },
  uae: { lat: 23.4241, lng: 53.8478, country: 'United Arab Emirates' },
  العراق: { lat: 33.2232, lng: 43.6793, country: 'Iraq' },
  iraq: { lat: 33.2232, lng: 43.6793, country: 'Iraq' },
  سوريا: { lat: 34.8021, lng: 38.9968, country: 'Syria' },
  syria: { lat: 34.8021, lng: 38.9968, country: 'Syria' },
  الأردن: { lat: 30.5852, lng: 36.2384, country: 'Jordan' },
  jordan: { lat: 30.5852, lng: 36.2384, country: 'Jordan' },
  لبنان: { lat: 33.8547, lng: 35.8623, country: 'Lebanon' },
  lebanon: { lat: 33.8547, lng: 35.8623, country: 'Lebanon' },
  فلسطين: { lat: 31.9522, lng: 35.2332, country: 'Palestine' },
  palestine: { lat: 31.9522, lng: 35.2332, country: 'Palestine' },
  إسرائيل: { lat: 31.0461, lng: 34.8516, country: 'Israel' },
  israel: { lat: 31.0461, lng: 34.8516, country: 'Israel' },
  اليمن: { lat: 15.5527, lng: 48.5164, country: 'Yemen' },
  yemen: { lat: 15.5527, lng: 48.5164, country: 'Yemen' },
  عمان: { lat: 21.4735, lng: 55.9754, country: 'Oman' },
  oman: { lat: 21.4735, lng: 55.9754, country: 'Oman' },
  قطر: { lat: 25.3548, lng: 51.1839, country: 'Qatar' },
  qatar: { lat: 25.3548, lng: 51.1839, country: 'Qatar' },
  الكويت: { lat: 29.3117, lng: 47.4818, country: 'Kuwait' },
  kuwait: { lat: 29.3117, lng: 47.4818, country: 'Kuwait' },
  البحرين: { lat: 26.0667, lng: 50.5577, country: 'Bahrain' },
  bahrain: { lat: 26.0667, lng: 50.5577, country: 'Bahrain' },
  تركيا: { lat: 38.9637, lng: 35.2433, country: 'Turkey' },
  turkey: { lat: 38.9637, lng: 35.2433, country: 'Turkey' },
  ايران: { lat: 32.4279, lng: 53.688, country: 'Iran' },
  iran: { lat: 32.4279, lng: 53.688, country: 'Iran' }
};

export const middleEastBounds = {
  southWest: [12.5, 25],
  northEast: [42, 64]
};

export function inferGeoFromText(text = '') {
  const normalized = text.toLowerCase();
  const match = Object.entries(countryCentroids).find(([token]) => normalized.includes(token));

  if (!match) {
    return { lat: 29.3759, lng: 47.9774, country: 'Middle East' };
  }

  const [, value] = match;
  return { lat: value.lat, lng: value.lng, country: value.country };
}

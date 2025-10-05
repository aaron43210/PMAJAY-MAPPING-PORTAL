export interface State {
  id: string;
  name: string;
  code: string;
}

export interface District {
  id: string;
  stateId: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
}

export interface Village {
  id: string;
  districtId: string;
  name: string;
  code: string;
  latitude?: number;
  longitude?: number;
}

export interface Agency {
  id: string;
  name: string;
  type: string;
}

export interface Project {
  id: string;
  component: string;
  stateId: string;
  districtId: string;
  villageId: string;
  agencyId: string;
  status: 'pending' | 'ongoing' | 'completed' | 'delayed';
  fundsAllocated: number;
  fundsUtilized: number;
  startDate: string;
  endDate?: string;
  description: string;
  beneficiaries: number;
}

export const states: State[] = [
  { id: '1', name: 'Andhra Pradesh', code: 'AP' },
  { id: '2', name: 'Arunachal Pradesh', code: 'AR' },
  { id: '3', name: 'Assam', code: 'AS' },
  { id: '4', name: 'Bihar', code: 'BR' },
  { id: '5', name: 'Chhattisgarh', code: 'CG' },
  { id: '6', name: 'Goa', code: 'GA' },
  { id: '7', name: 'Gujarat', code: 'GJ' },
  { id: '8', name: 'Haryana', code: 'HR' },
  { id: '9', name: 'Himachal Pradesh', code: 'HP' },
  { id: '10', name: 'Jharkhand', code: 'JH' },
  { id: '11', name: 'Karnataka', code: 'KA' },
  { id: '12', name: 'Kerala', code: 'KL' },
  { id: '13', name: 'Madhya Pradesh', code: 'MP' },
  { id: '14', name: 'Maharashtra', code: 'MH' },
  { id: '15', name: 'Manipur', code: 'MN' },
  { id: '16', name: 'Meghalaya', code: 'ML' },
  { id: '17', name: 'Mizoram', code: 'MZ' },
  { id: '18', name: 'Nagaland', code: 'NL' },
  { id: '19', name: 'Odisha', code: 'OR' },
  { id: '20', name: 'Punjab', code: 'PB' },
  { id: '21', name: 'Rajasthan', code: 'RJ' },
  { id: '22', name: 'Sikkim', code: 'SK' },
  { id: '23', name: 'Tamil Nadu', code: 'TN' },
  { id: '24', name: 'Telangana', code: 'TG' },
  { id: '25', name: 'Tripura', code: 'TR' },
  { id: '26', name: 'Uttar Pradesh', code: 'UP' },
  { id: '27', name: 'Uttarakhand', code: 'UK' },
  { id: '28', name: 'West Bengal', code: 'WB' },
];

export const districts: District[] = [
  // Andhra Pradesh
  { id: 'd1', stateId: '1', name: 'Visakhapatnam', code: 'VSP', latitude: 17.6869, longitude: 83.2185 },
  { id: 'd2', stateId: '1', name: 'Vijayawada', code: 'VJA', latitude: 16.5062, longitude: 80.6480 },
  { id: 'd3', stateId: '1', name: 'Guntur', code: 'GNT', latitude: 16.3067, longitude: 80.4365 },
  { id: 'd4', stateId: '1', name: 'Nellore', code: 'NLR', latitude: 14.4426, longitude: 79.9865 },
  { id: 'd5', stateId: '1', name: 'Kurnool', code: 'KNL', latitude: 15.8281, longitude: 78.0373 },
  // Karnataka
  { id: 'd6', stateId: '11', name: 'Bangalore Urban', code: 'BLR', latitude: 12.9716, longitude: 77.5946 },
  { id: 'd7', stateId: '11', name: 'Mysore', code: 'MYS', latitude: 12.2958, longitude: 76.6394 },
  { id: 'd8', stateId: '11', name: 'Mangalore', code: 'MNG', latitude: 12.9141, longitude: 74.8560 },
  { id: 'd9', stateId: '11', name: 'Hubli', code: 'HBL', latitude: 15.3647, longitude: 75.1240 },
  { id: 'd10', stateId: '11', name: 'Belgaum', code: 'BGM', latitude: 15.8497, longitude: 74.4977 },
  // Kerala
  { id: 'd11', stateId: '12', name: 'Thiruvananthapuram', code: 'TVM', latitude: 8.5241, longitude: 76.9366 },
  { id: 'd12', stateId: '12', name: 'Ernakulam', code: 'EKM', latitude: 9.9816, longitude: 76.2999 },
  { id: 'd13', stateId: '12', name: 'Kozhikode', code: 'KZD', latitude: 11.2588, longitude: 75.7804 },
  { id: 'd14', stateId: '12', name: 'Thrissur', code: 'TCR', latitude: 10.5276, longitude: 76.2144 },
  { id: 'd15', stateId: '12', name: 'Kollam', code: 'KLM', latitude: 8.8932, longitude: 76.6141 },
  // Tamil Nadu
  { id: 'd16', stateId: '23', name: 'Chennai', code: 'CHN', latitude: 13.0827, longitude: 80.2707 },
  { id: 'd17', stateId: '23', name: 'Coimbatore', code: 'CBE', latitude: 11.0168, longitude: 76.9558 },
  { id: 'd18', stateId: '23', name: 'Madurai', code: 'MDU', latitude: 9.9252, longitude: 78.1198 },
  { id: 'd19', stateId: '23', name: 'Tiruchirappalli', code: 'TPJ', latitude: 10.7905, longitude: 78.7047 },
  { id: 'd20', stateId: '23', name: 'Salem', code: 'SLM', latitude: 11.6643, longitude: 78.1460 },
  // Maharashtra
  { id: 'd21', stateId: '14', name: 'Mumbai', code: 'MUM', latitude: 19.0760, longitude: 72.8777 },
  { id: 'd22', stateId: '14', name: 'Pune', code: 'PUN', latitude: 18.5204, longitude: 73.8567 },
  { id: 'd23', stateId: '14', name: 'Nagpur', code: 'NGP', latitude: 21.1458, longitude: 79.0882 },
  { id: 'd24', stateId: '14', name: 'Nashik', code: 'NSK', latitude: 19.9975, longitude: 73.7898 },
  { id: 'd25', stateId: '14', name: 'Aurangabad', code: 'AUR', latitude: 19.8762, longitude: 75.3433 },
  // Rajasthan
  { id: 'd26', stateId: '21', name: 'Jaipur', code: 'JPR', latitude: 26.9124, longitude: 75.7873 },
  { id: 'd27', stateId: '21', name: 'Jodhpur', code: 'JDP', latitude: 26.2389, longitude: 73.0243 },
  { id: 'd28', stateId: '21', name: 'Udaipur', code: 'UDP', latitude: 24.5854, longitude: 73.7125 },
  { id: 'd29', stateId: '21', name: 'Kota', code: 'KOT', latitude: 25.2138, longitude: 75.8648 },
  { id: 'd30', stateId: '21', name: 'Ajmer', code: 'AJM', latitude: 26.4499, longitude: 74.6399 },
  // Uttar Pradesh
  { id: 'd31', stateId: '26', name: 'Lucknow', code: 'LKO', latitude: 26.8467, longitude: 80.9462 },
  { id: 'd32', stateId: '26', name: 'Kanpur', code: 'KNP', latitude: 26.4499, longitude: 80.3319 },
  { id: 'd33', stateId: '26', name: 'Varanasi', code: 'VNS', latitude: 25.3176, longitude: 82.9739 },
  { id: 'd34', stateId: '26', name: 'Agra', code: 'AGR', latitude: 27.1767, longitude: 78.0081 },
  { id: 'd35', stateId: '26', name: 'Meerut', code: 'MRT', latitude: 28.9845, longitude: 77.7064 },
  // West Bengal
  { id: 'd36', stateId: '28', name: 'Kolkata', code: 'KOL', latitude: 22.5726, longitude: 88.3639 },
  { id: 'd37', stateId: '28', name: 'Darjeeling', code: 'DJL', latitude: 27.0410, longitude: 88.2663 },
  { id: 'd38', stateId: '28', name: 'Howrah', code: 'HWH', latitude: 22.5958, longitude: 88.2636 },
  { id: 'd39', stateId: '28', name: 'Siliguri', code: 'SLG', latitude: 26.7271, longitude: 88.3953 },
  { id: 'd40', stateId: '28', name: 'Asansol', code: 'ASN', latitude: 23.6739, longitude: 86.9524 },
  // Bihar
  { id: 'd41', stateId: '4', name: 'Patna', code: 'PTN', latitude: 25.5941, longitude: 85.1376 },
  { id: 'd42', stateId: '4', name: 'Gaya', code: 'GYA', latitude: 24.7955, longitude: 85.0002 },
  { id: 'd43', stateId: '4', name: 'Bhagalpur', code: 'BGP', latitude: 25.2425, longitude: 86.9842 },
  { id: 'd44', stateId: '4', name: 'Muzaffarpur', code: 'MFP', latitude: 26.1225, longitude: 85.3906 },
  { id: 'd45', stateId: '4', name: 'Darbhanga', code: 'DBG', latitude: 26.1542, longitude: 85.8918 },
  // Gujarat
  { id: 'd46', stateId: '7', name: 'Ahmedabad', code: 'AMD', latitude: 23.0225, longitude: 72.5714 },
  { id: 'd47', stateId: '7', name: 'Surat', code: 'SRT', latitude: 21.1702, longitude: 72.8311 },
  { id: 'd48', stateId: '7', name: 'Vadodara', code: 'VDR', latitude: 22.3072, longitude: 73.1812 },
  { id: 'd49', stateId: '7', name: 'Rajkot', code: 'RJK', latitude: 22.3039, longitude: 70.8022 },
  { id: 'd50', stateId: '7', name: 'Gandhinagar', code: 'GNG', latitude: 23.2156, longitude: 72.6369 },
  // Punjab
  { id: 'd51', stateId: '20', name: 'Amritsar', code: 'ASR', latitude: 31.6340, longitude: 74.8723 },
  { id: 'd52', stateId: '20', name: 'Ludhiana', code: 'LDH', latitude: 30.9010, longitude: 75.8573 },
  { id: 'd53', stateId: '20', name: 'Jalandhar', code: 'JLN', latitude: 31.3260, longitude: 75.5762 },
  { id: 'd54', stateId: '20', name: 'Patiala', code: 'PTA', latitude: 30.3398, longitude: 76.3869 },
  { id: 'd55', stateId: '20', name: 'Bathinda', code: 'BTI', latitude: 30.2110, longitude: 74.9455 },
  // Haryana
  { id: 'd56', stateId: '8', name: 'Gurugram', code: 'GGN', latitude: 28.4595, longitude: 77.0266 },
  { id: 'd57', stateId: '8', name: 'Faridabad', code: 'FBD', latitude: 28.4089, longitude: 77.3178 },
  { id: 'd58', stateId: '8', name: 'Panipat', code: 'PNP', latitude: 29.3909, longitude: 76.9635 },
  { id: 'd59', stateId: '8', name: 'Ambala', code: 'AMB', latitude: 30.3782, longitude: 76.7767 },
  { id: 'd60', stateId: '8', name: 'Hisar', code: 'HSR', latitude: 29.1492, longitude: 75.7217 },
  // Madhya Pradesh
  { id: 'd61', stateId: '13', name: 'Bhopal', code: 'BPL', latitude: 23.2599, longitude: 77.4126 },
  { id: 'd62', stateId: '13', name: 'Indore', code: 'IDR', latitude: 22.7196, longitude: 75.8577 },
  { id: 'd63', stateId: '13', name: 'Gwalior', code: 'GWL', latitude: 26.2183, longitude: 78.1828 },
  { id: 'd64', stateId: '13', name: 'Jabalpur', code: 'JBP', latitude: 23.1815, longitude: 79.9864 },
  { id: 'd65', stateId: '13', name: 'Ujjain', code: 'UJN', latitude: 23.1765, longitude: 75.7885 },
  // Telangana
  { id: 'd66', stateId: '24', name: 'Hyderabad', code: 'HYD', latitude: 17.3850, longitude: 78.4867 },
  { id: 'd67', stateId: '24', name: 'Warangal', code: 'WRG', latitude: 17.9784, longitude: 79.6003 },
  { id: 'd68', stateId: '24', name: 'Nizamabad', code: 'NZB', latitude: 18.6725, longitude: 78.0941 },
  { id: 'd69', stateId: '24', name: 'Karimnagar', code: 'KMN', latitude: 18.4386, longitude: 79.1288 },
  { id: 'd70', stateId: '24', name: 'Khammam', code: 'KMM', latitude: 17.2473, longitude: 80.1514 },
  // Odisha
  { id: 'd71', stateId: '19', name: 'Bhubaneswar', code: 'BBS', latitude: 20.2961, longitude: 85.8245 },
  { id: 'd72', stateId: '19', name: 'Cuttack', code: 'CTC', latitude: 20.5124, longitude: 85.8830 },
  { id: 'd73', stateId: '19', name: 'Rourkela', code: 'RRK', latitude: 22.2604, longitude: 84.8536 },
  { id: 'd74', stateId: '19', name: 'Puri', code: 'PUR', latitude: 19.8135, longitude: 85.8312 },
  { id: 'd75', stateId: '19', name: 'Sambalpur', code: 'SBP', latitude: 21.4669, longitude: 83.9812 },
  // Jharkhand
  { id: 'd76', stateId: '10', name: 'Ranchi', code: 'RNC', latitude: 23.3441, longitude: 85.3096 },
  { id: 'd77', stateId: '10', name: 'Jamshedpur', code: 'JAM', latitude: 22.8046, longitude: 86.2029 },
  { id: 'd78', stateId: '10', name: 'Dhanbad', code: 'DHN', latitude: 23.7957, longitude: 86.4304 },
  { id: 'd79', stateId: '10', name: 'Bokaro', code: 'BKO', latitude: 23.6693, longitude: 86.1511 },
  { id: 'd80', stateId: '10', name: 'Hazaribagh', code: 'HZB', latitude: 23.9929, longitude: 85.3615 },
  // Chhattisgarh
  { id: 'd81', stateId: '5', name: 'Raipur', code: 'RAI', latitude: 21.2514, longitude: 81.6296 },
  { id: 'd82', stateId: '5', name: 'Bhilai', code: 'BHI', latitude: 21.2091, longitude: 81.3797 },
  { id: 'd83', stateId: '5', name: 'Bilaspur', code: 'BSP', latitude: 22.0797, longitude: 82.1409 },
  { id: 'd84', stateId: '5', name: 'Korba', code: 'KOR', latitude: 22.3595, longitude: 82.7501 },
  { id: 'd85', stateId: '5', name: 'Durg', code: 'DRG', latitude: 21.1938, longitude: 81.2849 },
  // Assam
  { id: 'd86', stateId: '3', name: 'Guwahati', code: 'GAU', latitude: 26.1445, longitude: 91.7362 },
  { id: 'd87', stateId: '3', name: 'Dibrugarh', code: 'DIB', latitude: 27.4728, longitude: 94.9120 },
  { id: 'd88', stateId: '3', name: 'Jorhat', code: 'JRH', latitude: 26.7509, longitude: 94.2037 },
  { id: 'd89', stateId: '3', name: 'Silchar', code: 'SCL', latitude: 24.8333, longitude: 92.7789 },
  { id: 'd90', stateId: '3', name: 'Tezpur', code: 'TEZ', latitude: 26.6338, longitude: 92.8000 },
  // Uttarakhand
  { id: 'd91', stateId: '27', name: 'Dehradun', code: 'DDN', latitude: 30.3165, longitude: 78.0322 },
  { id: 'd92', stateId: '27', name: 'Haridwar', code: 'HRW', latitude: 29.9457, longitude: 78.1642 },
  { id: 'd93', stateId: '27', name: 'Nainital', code: 'NTL', latitude: 29.3803, longitude: 79.4636 },
  { id: 'd94', stateId: '27', name: 'Roorkee', code: 'RKE', latitude: 29.8543, longitude: 77.8880 },
  { id: 'd95', stateId: '27', name: 'Haldwani', code: 'HDW', latitude: 29.2183, longitude: 79.5130 },
  // Himachal Pradesh
  { id: 'd96', stateId: '9', name: 'Shimla', code: 'SML', latitude: 31.1048, longitude: 77.1734 },
  { id: 'd97', stateId: '9', name: 'Dharamshala', code: 'DRM', latitude: 32.2190, longitude: 76.3234 },
  { id: 'd98', stateId: '9', name: 'Kullu', code: 'KLU', latitude: 31.9582, longitude: 77.1093 },
  { id: 'd99', stateId: '9', name: 'Manali', code: 'MNL', latitude: 32.2432, longitude: 77.1892 },
  { id: 'd100', stateId: '9', name: 'Solan', code: 'SLN', latitude: 30.9045, longitude: 77.0967 },
];

export const villages: Village[] = [
  { id: 'v1', districtId: 'd6', name: 'Yelahanka', code: 'YLH', latitude: 13.1007, longitude: 77.5963 },
  { id: 'v2', districtId: 'd6', name: 'Devanahalli', code: 'DVN', latitude: 13.2490, longitude: 77.7120 },
  { id: 'v3', districtId: 'd7', name: 'Srirangapatna', code: 'SRP', latitude: 12.4181, longitude: 76.6947 },
  { id: 'v4', districtId: 'd7', name: 'Hunsur', code: 'HNS', latitude: 12.3025, longitude: 76.2920 },
  { id: 'v5', districtId: 'd11', name: 'Neyyattinkara', code: 'NYT', latitude: 8.4004, longitude: 77.0890 },
  { id: 'v6', districtId: 'd11', name: 'Varkala', code: 'VRK', latitude: 8.7379, longitude: 76.7163 },
  { id: 'v7', districtId: 'd12', name: 'Aluva', code: 'ALV', latitude: 10.1080, longitude: 76.3525 },
  { id: 'v8', districtId: 'd12', name: 'Kalamassery', code: 'KLM', latitude: 10.0537, longitude: 76.3274 },
  { id: 'v9', districtId: 'd16', name: 'Tambaram', code: 'TBM', latitude: 12.9249, longitude: 80.1000 },
  { id: 'v10', districtId: 'd16', name: 'Avadi', code: 'AVD', latitude: 13.1147, longitude: 80.1018 },
  { id: 'v11', districtId: 'd17', name: 'Pollachi', code: 'PLC', latitude: 10.6580, longitude: 77.0080 },
  { id: 'v12', districtId: 'd17', name: 'Mettupalayam', code: 'MTP', latitude: 11.2994, longitude: 76.9376 },
  { id: 'v13', districtId: 'd21', name: 'Kurla', code: 'KRL', latitude: 19.0688, longitude: 72.8794 },
  { id: 'v14', districtId: 'd21', name: 'Andheri', code: 'AND', latitude: 19.1136, longitude: 72.8697 },
  { id: 'v15', districtId: 'd22', name: 'Pimpri', code: 'PMP', latitude: 18.6298, longitude: 73.8038 },
  { id: 'v16', districtId: 'd22', name: 'Khadki', code: 'KDK', latitude: 18.5645, longitude: 73.8393 },
  { id: 'v17', districtId: 'd26', name: 'Amber', code: 'AMB', latitude: 26.9855, longitude: 75.8513 },
  { id: 'v18', districtId: 'd26', name: 'Sanganer', code: 'SGN', latitude: 26.8483, longitude: 75.7999 },
  { id: 'v19', districtId: 'd28', name: 'Jaisamand', code: 'JSM', latitude: 24.5512, longitude: 73.6050 },
  { id: 'v20', districtId: 'd28', name: 'Mavli', code: 'MVL', latitude: 24.5682, longitude: 73.7343 },
  { id: 'v21', districtId: 'd31', name: 'Malihabad', code: 'MLH', latitude: 26.9225, longitude: 80.7134 },
  { id: 'v22', districtId: 'd31', name: 'Mohanlalganj', code: 'MLG', latitude: 26.7500, longitude: 80.8500 },
  { id: 'v23', districtId: 'd33', name: 'Sarnath', code: 'SRT', latitude: 25.3816, longitude: 83.0224 },
  { id: 'v24', districtId: 'd33', name: 'Ramnagar', code: 'RNR', latitude: 25.2698, longitude: 82.9893 },
  { id: 'v25', districtId: 'd36', name: 'Barrackpore', code: 'BRP', latitude: 22.7642, longitude: 88.3776 },
  { id: 'v26', districtId: 'd36', name: 'Barasat', code: 'BRS', latitude: 22.7233, longitude: 88.4816 },
  { id: 'v27', districtId: 'd41', name: 'Danapur', code: 'DNP', latitude: 25.6316, longitude: 85.0475 },
  { id: 'v28', districtId: 'd41', name: 'Phulwarisharif', code: 'PWS', latitude: 25.5492, longitude: 84.9971 },
  { id: 'v29', districtId: 'd46', name: 'Sanand', code: 'SND', latitude: 22.9930, longitude: 72.3721 },
  { id: 'v30', districtId: 'd46', name: 'Dholka', code: 'DLK', latitude: 22.7273, longitude: 72.4403 },
];

export const agencies: Agency[] = [
  { id: 'a1', name: 'National SC/ST Hub', type: 'Government' },
  { id: 'a2', name: 'Rural Development Agency', type: 'Government' },
  { id: 'a3', name: 'Skill India Mission', type: 'Government' },
  { id: 'a4', name: 'Infrastructure Development Corporation', type: 'PSU' },
  { id: 'a5', name: 'Sarva Shiksha Abhiyan', type: 'Government' },
  { id: 'a6', name: 'Jan Kalyan Sanstha', type: 'NGO' },
  { id: 'a7', name: 'Tribal Welfare Board', type: 'Government' },
  { id: 'a8', name: 'Community Development Foundation', type: 'NGO' },
  { id: 'a9', name: 'State Housing Board', type: 'Government' },
  { id: 'a10', name: 'Youth Empowerment Trust', type: 'NGO' },
];

export const components = [
  'Adarsh Gram Yojana',
  'SC/ST Hostels',
  'Skill Development',
  'Infrastructure Development',
  'NGO Community Projects',
];

export const projects: Project[] = [
  {
    id: 'p1',
    component: 'Adarsh Gram Yojana',
    stateId: '11',
    districtId: 'd6',
    villageId: 'v1',
    agencyId: 'a1',
    status: 'completed',
    fundsAllocated: 5000000,
    fundsUtilized: 4800000,
    startDate: '2023-01-15',
    endDate: '2024-03-30',
    description: 'Complete village development with infrastructure and sanitation',
    beneficiaries: 1200,
  },
  {
    id: 'p2',
    component: 'SC/ST Hostels',
    stateId: '12',
    districtId: 'd11',
    villageId: 'v5',
    agencyId: 'a5',
    status: 'ongoing',
    fundsAllocated: 8000000,
    fundsUtilized: 6200000,
    startDate: '2023-06-01',
    description: 'Construction of 100-bed hostel facility for SC/ST students',
    beneficiaries: 100,
  },
  {
    id: 'p3',
    component: 'Skill Development',
    stateId: '23',
    districtId: 'd16',
    villageId: 'v9',
    agencyId: 'a3',
    status: 'completed',
    fundsAllocated: 3500000,
    fundsUtilized: 3400000,
    startDate: '2022-08-10',
    endDate: '2023-12-20',
    description: 'IT and vocational training center establishment',
    beneficiaries: 450,
  },
  {
    id: 'p4',
    component: 'Infrastructure Development',
    stateId: '14',
    districtId: 'd21',
    villageId: 'v13',
    agencyId: 'a4',
    status: 'ongoing',
    fundsAllocated: 12000000,
    fundsUtilized: 8500000,
    startDate: '2023-03-15',
    description: 'Road connectivity and drainage system upgrade',
    beneficiaries: 2500,
  },
  {
    id: 'p5',
    component: 'NGO Community Projects',
    stateId: '21',
    districtId: 'd26',
    villageId: 'v17',
    agencyId: 'a6',
    status: 'completed',
    fundsAllocated: 2500000,
    fundsUtilized: 2450000,
    startDate: '2022-11-01',
    endDate: '2024-01-15',
    description: 'Women empowerment and livelihood programs',
    beneficiaries: 350,
  },
  {
    id: 'p6',
    component: 'Adarsh Gram Yojana',
    stateId: '26',
    districtId: 'd31',
    villageId: 'v21',
    agencyId: 'a2',
    status: 'ongoing',
    fundsAllocated: 6500000,
    fundsUtilized: 4200000,
    startDate: '2023-09-01',
    description: 'Model village development with solar power and water supply',
    beneficiaries: 1800,
  },
  {
    id: 'p7',
    component: 'SC/ST Hostels',
    stateId: '28',
    districtId: 'd36',
    villageId: 'v25',
    agencyId: 'a5',
    status: 'delayed',
    fundsAllocated: 7000000,
    fundsUtilized: 3500000,
    startDate: '2023-02-20',
    description: 'Girls hostel with modern amenities',
    beneficiaries: 80,
  },
  {
    id: 'p8',
    component: 'Skill Development',
    stateId: '4',
    districtId: 'd41',
    villageId: 'v27',
    agencyId: 'a3',
    status: 'ongoing',
    fundsAllocated: 4000000,
    fundsUtilized: 2800000,
    startDate: '2023-07-15',
    description: 'Textile and handicraft training center',
    beneficiaries: 300,
  },
  {
    id: 'p9',
    component: 'Infrastructure Development',
    stateId: '7',
    districtId: 'd46',
    villageId: 'v29',
    agencyId: 'a9',
    status: 'completed',
    fundsAllocated: 10000000,
    fundsUtilized: 9800000,
    startDate: '2022-04-01',
    endDate: '2024-02-28',
    description: 'Community center and health clinic construction',
    beneficiaries: 3200,
  },
  {
    id: 'p10',
    component: 'NGO Community Projects',
    stateId: '20',
    districtId: 'd51',
    villageId: 'v25',
    agencyId: 'a8',
    status: 'ongoing',
    fundsAllocated: 3000000,
    fundsUtilized: 2100000,
    startDate: '2023-05-10',
    description: 'Youth development and sports facilities',
    beneficiaries: 500,
  },
];

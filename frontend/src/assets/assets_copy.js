import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './doc16.png'
import doc17 from './doc17.png'
import doc18 from './doc18.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James is a dedicated general physician with 4 years of experience providing holistic healthcare. He specializes in preventive medicine, chronic disease management, and routine health check-ups. Dr. James emphasizes patient education, lifestyle modifications, and early intervention to improve long-term wellness. Known for his empathetic approach and thorough diagnostics, he excels in managing diabetes, hypertension, and respiratory conditions.',
        fees: 50,
        address: { line1: '123 Richmond Street', line2: 'Central Clinic Building, London, UK' }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson is a compassionate gynecologist specializing in women’s health, prenatal care, and reproductive medicine. With 3 years of experience, she manages menstrual disorders, high-risk pregnancies, and fertility treatments. Dr. Larson believes in empowering her patients with knowledge about their bodies and treatment options. She is known for her gentle approach and meticulous care during consultations and procedures.',
        fees: 60,
        address: { line1: '45 Baker Street', line2: 'Women’s Health Centre, London, UK' }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Sarah Patel is a skilled dermatologist specializing in the treatment of skin conditions such as acne, eczema, psoriasis, and pigmentation issues. She provides both medical and cosmetic dermatology services, including laser therapy and skin rejuvenation. Dr. Patel adopts a holistic approach to skin health, emphasizing preventive care and patient education. Her goal is to improve patients’ skin health and confidence through personalized care.',
        fees: 30,
        address: { line1: '22 Willow Avenue', line2: 'Skin Care Clinic, London, UK' }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee is a dedicated pediatrician providing expert care for infants, children, and adolescents. With 2 years of experience, he offers routine check-ups, vaccinations, and management of acute and chronic illnesses. Dr. Lee emphasizes preventive care, nutrition counseling, and developmental monitoring. Known for his friendly and approachable demeanor, he ensures children feel comfortable and supported during medical visits.',
        fees: 40,
        address: { line1: '11 Green Park Road', line2: 'Happy Kids Clinic, London, UK' }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, MD (Neurology)',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia is a neurologist with expertise in diagnosing and managing disorders of the nervous system. She treats conditions such as migraines, epilepsy, neuropathies, and stroke recovery. With 4 years of experience, Dr. Garcia uses advanced diagnostics and individualized treatment plans. She prioritizes patient education and rehabilitation to improve quality of life and long-term neurological health.',
        fees: 50,
        address: { line1: '88 Queen’s Road', line2: 'Neuro Health Centre, London, UK' }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams is an experienced neurologist specializing in brain and spinal disorders, including epilepsy, neuropathic pain, and neurodegenerative diseases. He focuses on accurate diagnosis, evidence-based treatments, and patient-centered care. Dr. Williams believes in integrating lifestyle counseling and therapy plans to enhance neurological recovery and overall well-being.',
        fees: 50,
        address: { line1: '90 King Street', line2: 'Neuroscience Clinic, London, UK' }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis is a general physician with a strong focus on preventive healthcare, chronic disease management, and wellness check-ups. He has 4 years of experience providing personalized medical care and patient counseling. Dr. Davis is committed to promoting healthy lifestyles and early intervention, particularly in managing cardiovascular and metabolic disorders.',
        fees: 50,
        address: { line1: '55 Richmond Avenue', line2: 'Wellness Centre, London, UK' }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White specializes in women’s health, reproductive medicine, and minimally invasive gynecological procedures. With 3 years of experience, he provides personalized prenatal care, fertility guidance, and treatment for menstrual disorders. Dr. White emphasizes clear communication and patient comfort during consultations and procedures.',
        fees: 60,
        address: { line1: '101 St. Mary’s Street', line2: 'Fertility & Women’s Care, London, UK' }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Ava Mitchell is a dermatologist focusing on medical and cosmetic skin care, including acne management, anti-aging treatments, and skin rejuvenation. She emphasizes personalized treatment plans, preventive care, and educating patients on long-term skin health. Dr. Mitchell is known for her attention to detail and empathetic patient care.',
        fees: 30,
        address: { line1: '36 Willow Lane', line2: 'Advanced Skin Clinic, London, UK' }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King is a pediatrician committed to comprehensive child healthcare, including vaccinations, nutrition guidance, and monitoring developmental milestones. With 2 years of experience, he ensures that children and parents receive support and guidance for a healthy upbringing. Dr. King is praised for his gentle approach and ability to build trust with young patients.',
        fees: 40,
        address: { line1: '18 Green Park Road', line2: 'Children’s Health Clinic, London, UK' }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly is a neurologist with a focus on complex neurological disorders such as multiple sclerosis, epilepsy, and neuropathic pain. She emphasizes patient-centered care and uses advanced diagnostic tools to design effective treatment plans. Dr. Kelly prioritizes rehabilitation and lifestyle guidance to maximize neurological health and quality of life.',
        fees: 50,
        address: { line1: '92 Queen’s Road', line2: 'NeuroCare Institute, London, UK' }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris is a skilled neurologist specializing in stroke management, epilepsy, and neuromuscular disorders. With 4 years of experience, he combines diagnostic expertise with patient-focused treatment strategies. Dr. Harris emphasizes long-term neurological care, rehabilitation, and preventive measures to improve patient outcomes.',
        fees: 50,
        address: { line1: '94 King Street', line2: 'Brain & Spine Clinic, London, UK' }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans provides general healthcare services including chronic disease management, routine screenings, and preventive care. She takes a holistic approach to health, focusing on patient education, early diagnosis, and lifestyle counseling. Dr. Evans is recognized for her empathetic approach and commitment to improving patient wellness.',
        fees: 50,
        address: { line1: '60 Richmond Avenue', line2: 'Health First Clinic, London, UK' }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez is a gynecologist specializing in reproductive health, prenatal care, and minimally invasive gynecological procedures. With 3 years of experience, he provides personalized patient care, emphasizes patient comfort, and educates patients on treatment options. He is particularly experienced in managing high-risk pregnancies and fertility concerns.',
        fees: 60,
        address: { line1: '103 St. Mary’s Street', line2: 'Advanced Women’s Health, London, UK' }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Amelia Hill is a dermatologist focusing on medical and cosmetic skin treatments, including acne, pigmentation, and anti-aging therapies. She provides tailored skincare plans and emphasizes preventive care and patient education. Dr. Hill is known for her thorough approach and friendly patient interactions.',
        fees: 30,
        address: { line1: '38 Willow Lane', line2: 'Skin Wellness Clinic, London, UK' }
    },
    {
        _id: 'doc16',
        name: 'Dr. Olivia Turner',
        image: doc16,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD (Gastroenterology)',
        experience: '5 Years',
        about: 'Dr. Olivia Turner is a leading gastroenterologist specializing in digestive health, liver disorders, and endoscopic procedures. She emphasizes a patient-centric approach, preventive care, and lifestyle modifications. With 5 years of experience, she excels in managing gastrointestinal diseases, including IBS, ulcers, and liver conditions, using advanced diagnostics and minimally invasive techniques.',
        fees: 70,
        address: { line1: '70 Victoria Street', line2: 'Digestive Health Centre, London, UK' }
    },
    {
        _id: 'doc17',
        name: 'Dr. Ethan Parker',
        image: doc17,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '7 Years',
        about: 'Dr. Ethan Parker is a gastroenterologist with 7 years of experience in treating complex gastrointestinal disorders, including liver cirrhosis, pancreatic diseases, and inflammatory bowel disease. He focuses on precise diagnostics, minimally invasive procedures, and individualized treatment plans. Dr. Parker is recognized for his patient-focused care and effective management of chronic digestive diseases.',
        fees: 80,
        address: { line1: '75 Victoria Street', line2: 'London Gastro Clinic, London, UK' }
    },
    {
        _id: 'doc18',
        name: 'Dr. Sophia Adams',
        image: doc18,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD (Internal Medicine)',
        experience: '6 Years',
        about: 'Dr. Sophia Adams specializes in digestive wellness and the management of gastrointestinal disorders. She uses minimally invasive procedures, comprehensive diagnostics, and lifestyle-focused interventions to ensure long-term digestive health. With 6 years of experience, she is known for her precise, patient-centered approach and dedication to improving overall quality of life for her patients.',
        fees: 75,
        address: { line1: '80 Victoria Street', line2: 'Digestive Care & Wellness, London, UK' }
    }
];

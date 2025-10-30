// Application State (using variables instead of localStorage)
let appState = {
    theme: 'light',
    language: 'en',
    voiceOutputEnabled: true,
    conversationHistory: [],
    userName: '',
    context: {}
};

// Language Configuration
const languages = {
    en: {
        code: 'en-US',
        name: 'English',
        greeting: "Hello! I'm your AI assistant. How can I help you today?",
        voiceCode: 'en-US'
    },
    hi: {
        code: 'hi-IN',
        name: 'हिंदी',
        greeting: 'नमस्ते! मैं आपका AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
        voiceCode: 'hi-IN'
    }
};

// Comprehensive Knowledge Base
const knowledgeBase = {
    greetings: [
        {
            patterns: ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'hola', 'greetings'],
            responses: {
                en: ["Hello! I'm happy to chat with you. How can I help you today? 😊", "Hi there! Great to see you. What can I do for you?", "Hey! I'm here to help. What's on your mind?"],
                hi: ["नमस्ते! मैं आपसे बात करके खुश हूं। मैं आपकी कैसे मदद कर सकता हूं? 😊", "नमस्कार! आपसे मिलकर अच्छा लगा। मैं क्या कर सकता हूं?", "हैलो! मैं मदद के लिए यहां हूं।"]
            }
        },
        {
            patterns: ['how are you', 'whats up', 'how do you do', 'kaise ho', 'kya hal hai'],
            responses: {
                en: ["I'm doing great! Thanks for asking. I'm here to help and chat with you. 🎉", "I'm wonderful! How can I assist you today?", "Doing fantastic! What brings you here?"],
                hi: ["मैं बहुत अच्छा हूं! पूछने के लिए धन्यवाद। मैं आपकी मदद करने के लिए यहां हूं। 🎉", "मैं शानदार हूं! आज मैं आपकी कैसे मदद कर सकता हूं?", "बहुत बढ़िया हूं! आप यहाँ क्यों आए हैं?"]
            }
        },
        {
            patterns: ['good morning', 'good afternoon', 'good evening', 'good night', 'suprabhat', 'shubh ratri'],
            responses: {
                en: ["Good morning! ☀️ I hope you have a wonderful day ahead!", "Good day to you! How can I brighten your day?", "Hello! Wishing you an amazing day!"],
                hi: ["सुप्रभात! ☀️ मुझे आशा है कि आपका दिन शानदार होगा!", "आपको दिन की शुभकामनाएं! मैं आपकी कैसे मदद कर सकता हूं?", "नमस्ते! आपका दिन मंगलमय हो!"]
            }
        },
        {
            patterns: ['bye', 'goodbye', 'see you', 'alvida', 'namaste goodbye'],
            responses: {
                en: ["Goodbye! Have a great day ahead! 👋", "See you later! Take care!", "Farewell! Come back anytime!"],
                hi: ["अलविदा! आपका दिन शुभ हो! 👋", "फिर मिलेंगे! ख्याल रखना!", "नमस्ते! कभी भी वापस आएं!"]
            }
        },
        {
            patterns: ['thank you', 'thanks', 'appreciate', 'dhanyavad', 'shukriya'],
            responses: {
                en: ["You're welcome! Happy to help! 😊", "My pleasure! Anytime!", "Glad I could help!"],
                hi: ["आपका स्वागत है! मदद करके खुशी हुई! 😊", "मेरी खुशी! कभी भी!", "मुझे मदद करके अच्छा लगा!"]
            }
        }
    ],
    technology: [
        {
            patterns: ['smartphone', 'mobile', 'phone', 'iphone', 'android', 'mobile phone'],
            responses: {
                en: ["Great question! The latest smartphones feature advanced processors, high-refresh displays, and impressive camera systems. What specific device are you interested in learning about?", "Smartphones have come a long way! Today's devices offer AI capabilities, 5G connectivity, and incredible computational photography. Need specific recommendations?"],
                hi: ["बढ़िया सवाल! नवीनतम स्मार्टफोन में उन्नत प्रोसेसर, उच्च-रिफ्रेश डिस्प्ले और प्रभावशाली कैमरा सिस्टम हैं। आप किस डिवाइस के बारे में जानना चाहते हैं?", "स्मार्टफोन बहुत विकसित हो गए हैं! आज के उपकरणों में AI क्षमताएं, 5G कनेक्टिविटी हैं।"]
            }
        },
        {
            patterns: ['computer', 'laptop', 'desktop', 'pc', 'gaming pc'],
            responses: {
                en: ["Computers and laptops come in many types - gaming machines, workstations, ultrabooks, and more. Each serves different purposes. What are you looking for?", "From powerful desktops to portable ultrabooks, computers cater to various needs. Are you interested in gaming, work, or general use?"],
                hi: ["कंप्यूटर और लैपटॉप कई प्रकार के होते हैं - गेमिंग मशीनें, वर्कस्टेशन, अल्ट्राबुक। आप क्या ढूंढ रहे हैं?", "शक्तिशाली डेस्कटॉप से लेकर पोर्टेबल अल्ट्राबुक तक, कंप्यूटर विभिन्न आवश्यकताओं को पूरा करते हैं।"]
            }
        },
        {
            patterns: ['artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning'],
            responses: {
                en: ["AI and Machine Learning are revolutionizing technology! 🤖 From self-driving cars to medical diagnosis, AI is transforming every industry. What aspect interests you?", "Artificial Intelligence enables machines to learn from experience and perform human-like tasks. It's powering innovations across healthcare, finance, and entertainment!"],
                hi: ["AI और मशीन लर्निंग प्रौद्योगिकी में क्रांति ला रहे हैं! 🤖 स्व-चालित कारों से लेकर चिकित्सा निदान तक। कौन सा पहलू आपकी रुचि है?", "कृत्रिम बुद्धिमत्ता मशीनों को अनुभव से सीखने और मानव-समान कार्य करने में सक्षम बनाती है।"]
            }
        },
        {
            patterns: ['internet', 'wifi', 'broadband', 'network', '5g', '4g'],
            responses: {
                en: ["The internet connects billions worldwide! 🌐 From 4G to 5G, connectivity keeps improving. Need help with network issues or understanding internet technologies?", "Modern internet offers blazing speeds through fiber optics and 5G networks. What would you like to know about connectivity?"],
                hi: ["इंटरनेट दुनिया भर में अरबों लोगों को जोड़ता है! 🌐 4G से 5G तक, कनेक्टिविटी में सुधार हो रहा है। नेटवर्क के बारे में मदद चाहिए?", "आधुनिक इंटरनेट फाइबर ऑप्टिक्स और 5G नेटवर्क के माध्यम से तेज गति प्रदान करता है।"]
            }
        }
    ],
    health: [
        {
            patterns: ['exercise', 'fitness', 'workout', 'gym', 'running', 'yoga'],
            responses: {
                en: ["Regular exercise is fantastic for your health! 💪 Aim for 150 minutes of moderate activity per week. This includes cardio, strength training, and flexibility work. What type of exercise interests you?", "Fitness is a journey! Whether it's yoga, running, or weightlifting, consistency is key. Start small and build gradually. What's your fitness goal?"],
                hi: ["नियमित व्यायाम आपके स्वास्थ्य के लिए शानदार है! 💪 प्रति सप्ताह 150 मिनट मध्यम गतिविधि का लक्ष्य रखें। आप किस प्रकार के व्यायाम में रुचि रखते हैं?", "फिटनेस एक यात्रा है! चाहे वह योग, दौड़ना या वेटलिफ्टिंग हो, निरंतरता महत्वपूर्ण है।"]
            }
        },
        {
            patterns: ['sleep', 'rest', 'tired', 'insomnia', 'sleeping'],
            responses: {
                en: ["Getting enough sleep is crucial for your health! 😴 Most adults need 7-9 hours per night. Try to maintain a consistent sleep schedule. Are you having trouble sleeping?", "Quality sleep is essential! Create a relaxing bedtime routine, avoid screens before bed, and keep your room cool and dark. Sweet dreams!"],
                hi: ["पर्याप्त नींद आपके स्वास्थ्य के लिए महत्वपूर्ण है! 😴 अधिकांश वयस्कों को प्रति रात 7-9 घंटे की आवश्यकता होती है। क्या आपको नींद की समस्या है?", "गुणवत्ता नींद आवश्यक है! सोने से पहले स्क्रीन से बचें और अपने कमरे को ठंडा और अंधेरा रखें।"]
            }
        },
        {
            patterns: ['diet', 'nutrition', 'food', 'healthy eating', 'vitamins'],
            responses: {
                en: ["Nutrition is the foundation of health! 🥗 Focus on whole foods, fruits, vegetables, lean proteins, and whole grains. Stay hydrated too! What's your dietary goal?", "A balanced diet includes all essential nutrients. Eat colorful vegetables, adequate protein, and healthy fats. Everything in moderation!"],
                hi: ["पोषण स्वास्थ्य की नींव है! 🥗 संपूर्ण खाद्य पदार्थ, फल, सब्जियां, दुबला प्रोटीन पर ध्यान दें। हाइड्रेटेड रहें! आपका आहार लक्ष्य क्या है?", "संतुलित आहार में सभी आवश्यक पोषक तत्व शामिल हैं। रंगीन सब्जियां, पर्याप्त प्रोटीन और स्वस्थ वसा खाएं।"]
            }
        },
        {
            patterns: ['water', 'hydration', 'drink water'],
            responses: {
                en: ["Staying hydrated is vital! 💧 Aim for 8 glasses of water daily. Water helps with digestion, skin health, and energy levels. Drink up!", "Water is life! Keep a water bottle handy and sip throughout the day. Your body will thank you!"],
                hi: ["हाइड्रेटेड रहना महत्वपूर्ण है! 💧 दैनिक 8 गिलास पानी का लक्ष्य रखें। पानी पाचन, त्वचा स्वास्थ्य में मदद करता है।", "पानी जीवन है! पानी की बोतल अपने पास रखें और दिन भर में पीते रहें।"]
            }
        }
    ],
    education: [
        {
            patterns: ['study', 'learn', 'education', 'school', 'college', 'university'],
            responses: {
                en: ["Learning is a lifelong journey! 📚 What subject would you like to learn about? I can help you with tips, resources, or explain various topics.", "Education opens doors! Whether it's math, science, languages, or arts, continuous learning keeps your mind sharp. What interests you?"],
                hi: ["सीखना एक आजीवन यात्रा है! 📚 आप किस विषय के बारे में जानना चाहते हैं? मैं सुझाव या संसाधनों के साथ मदद कर सकता हूं।", "शिक्षा दरवाजे खोलती है! चाहे गणित, विज्ञान, भाषाएं हों, निरंतर सीखना आपके दिमाग को तेज रखता है।"]
            }
        },
        {
            patterns: ['math', 'mathematics', 'algebra', 'geometry', 'calculus'],
            responses: {
                en: ["Mathematics is the language of the universe! 🔢 From basic arithmetic to advanced calculus, math helps us understand patterns and solve problems. What topic do you need help with?", "Math can be fun! Whether it's solving equations or understanding geometry, practice makes perfect. Which area interests you?"],
                hi: ["गणित ब्रह्मांड की भाषा है! 🔢 बुनियादी अंकगणित से लेकर उन्नत कलन तक, गणित हमें पैटर्न समझने में मदद करता है। किस विषय में मदद चाहिए?", "गणित मजेदार हो सकता है! चाहे समीकरण हल करना हो या ज्यामिति समझना, अभ्यास से सिद्धि मिलती है।"]
            }
        },
        {
            patterns: ['science', 'physics', 'chemistry', 'biology'],
            responses: {
                en: ["Science is amazing! 🔬 It helps us understand how the world works. From atoms to galaxies, from cells to ecosystems. What scientific topic fascinates you?", "The scientific method has unlocked countless mysteries! Physics, chemistry, and biology each reveal different aspects of our universe."],
                hi: ["विज्ञान अद्भुत है! 🔬 यह हमें दुनिया के काम करने के तरीके को समझने में मदद करता है। कौन सा वैज्ञानिक विषय आपको आकर्षित करता है?", "वैज्ञानिक विधि ने अनगिनत रहस्यों को खोला है! भौतिकी, रसायन विज्ञान और जीव विज्ञान हमारे ब्रह्मांड के विभिन्न पहलुओं को प्रकट करते हैं।"]
            }
        }
    ],
    business: [
        {
            patterns: ['business', 'startup', 'entrepreneur', 'company'],
            responses: {
                en: ["Entrepreneurship is exciting! 💼 Starting a business requires planning, dedication, and adaptability. What aspect of business are you curious about?", "Business success comes from solving problems and creating value. From startups to corporations, innovation drives growth!"],
                hi: ["उद्यमिता रोमांचक है! 💼 व्यवसाय शुरू करने के लिए योजना, समर्पण और अनुकूलनशीलता की आवश्यकता होती है। व्यवसाय का कौन सा पहलू आपको उत्सुक करता है?", "व्यावसायिक सफलता समस्याओं को हल करने और मूल्य बनाने से आती है!"]
            }
        },
        {
            patterns: ['job', 'career', 'work', 'employment', 'resume'],
            responses: {
                en: ["Career development is crucial! 🎯 Focus on building skills, networking, and continuous learning. What's your career goal?", "Finding the right career path takes exploration. Identify your strengths, passions, and values. How can I help with your career?"],
                hi: ["करियर विकास महत्वपूर्ण है! 🎯 कौशल निर्माण, नेटवर्किंग और निरंतर सीखने पर ध्यान दें। आपका करियर लक्ष्य क्या है?", "सही करियर पथ खोजने के लिए अन्वेषण की आवश्यकता होती है। अपनी ताकत, जुनून को पहचानें।"]
            }
        },
        {
            patterns: ['money', 'finance', 'investment', 'savings', 'budget'],
            responses: {
                en: ["Financial literacy is empowering! 💰 Save regularly, invest wisely, and live within your means. What financial topic interests you?", "Smart money management includes budgeting, saving, and strategic investing. Start early and be consistent!"],
                hi: ["वित्तीय साक्षरता सशक्त बनाती है! 💰 नियमित रूप से बचत करें, बुद्धिमानी से निवेश करें। कौन सा वित्तीय विषय आपकी रुचि है?", "स्मार्ट धन प्रबंधन में बजट, बचत और रणनीतिक निवेश शामिल है।"]
            }
        }
    ],
    entertainment: [
        {
            patterns: ['movie', 'film', 'cinema', 'bollywood', 'hollywood'],
            responses: {
                en: ["Movies are magical! 🎬 From action-packed blockbusters to thought-provoking dramas, cinema entertains and inspires. What genre do you enjoy?", "Film is art in motion! Great movies tell stories that stay with us. What's your favorite film?"],
                hi: ["फिल्में जादुई हैं! 🎬 एक्शन से भरपूर ब्लॉकबस्टर से लेकर विचारोत्तेजक नाटकों तक। आप किस शैली का आनंद लेते हैं?", "फिल्म गति में कला है! महान फिल्में ऐसी कहानियां बताती हैं जो हमारे साथ रहती हैं।"]
            }
        },
        {
            patterns: ['music', 'song', 'singer', 'band', 'concert'],
            responses: {
                en: ["Music is universal! 🎵 It transcends language and culture. From classical to rock, hip-hop to jazz. What's your favorite genre?", "Music moves the soul! Whether it's energizing beats or soothing melodies, there's something for every mood."],
                hi: ["संगीत सार्वभौमिक है! 🎵 यह भाषा और संस्कृति से परे है। शास्त्रीय से रॉक, हिप-हॉप से जैज़ तक। आपकी पसंदीदा शैली कौन सी है?", "संगीत आत्मा को छूता है! चाहे ऊर्जावान बीट हो या सुखदायक धुन।"]
            }
        },
        {
            patterns: ['game', 'gaming', 'video game', 'esports'],
            responses: {
                en: ["Gaming is huge! 🎮 From casual mobile games to competitive esports, gaming offers entertainment and challenges. What games do you play?", "Video games combine art, storytelling, and interactivity. The gaming industry rivals Hollywood! What's your favorite game?"],
                hi: ["गेमिंग बहुत बड़ा है! 🎮 साधारण मोबाइल गेम से लेकर प्रतिस्पर्धी एस्पोर्ट्स तक। आप कौन से गेम खेलते हैं?", "वीडियो गेम कला, कहानी कहने और अंतःक्रियाशीलता को जोड़ते हैं। आपका पसंदीदा गेम कौन सा है?"]
            }
        }
    ],
    general: [
        {
            patterns: ['weather', 'rain', 'sunny', 'climate', 'temperature'],
            responses: {
                en: ["Weather affects our daily lives! ☀️🌧️ Climate patterns are fascinating. I can't check real-time weather, but I can discuss climate topics!", "Weather and climate are different - weather is short-term, climate is long-term patterns. What would you like to know?"],
                hi: ["मौसम हमारे दैनिक जीवन को प्रभावित करता है! ☀️🌧️ मैं वास्तविक समय का मौसम नहीं देख सकता, लेकिन जलवायु विषयों पर चर्चा कर सकता हूं!", "मौसम और जलवायु अलग हैं - मौसम अल्पकालिक है, जलवायु दीर्घकालिक पैटर्न है।"]
            }
        },
        {
            patterns: ['time', 'date', 'day', 'today', 'clock'],
            responses: {
                en: ["Time is precious! ⏰ I don't have access to real-time data, but I can discuss time management, productivity, and more!", "Managing time effectively is a valuable skill. What time-related topic interests you?"],
                hi: ["समय अनमोल है! ⏰ मेरे पास वास्तविक समय का डेटा नहीं है, लेकिन मैं समय प्रबंधन पर चर्चा कर सकता हूं!", "समय को प्रभावी ढंग से प्रबंधित करना एक मूल्यवान कौशल है।"]
            }
        },
        {
            patterns: ['joke', 'funny', 'laugh', 'lol','humor'],
            responses: {
                en: ["Why don't scientists trust atoms? Because they make up everything! ", "What do you call a bear with no teeth? A gummy bear! 🐻", "Why did the scarecrow win an award? He was outstanding in his field! 🌾"],
                hi: ["शिक्षक: बताओ 5 चीजें जो दूध में होती हैं। छात्र: मक्खी, धूल, गंदगी, बाल और... शिक्षक: चुप करो! ", "हास्य जीवन का मसाला है! ", "पति: तुम इतनी सुंदर क्यों हो? पत्नी: क्योंकि मैं तुम्हारी हूं! पति: तो मैं भी सुंदर हूं ना? पत्नी: हां, झूठ बोलने में! 😄"]
            }
        },
        {
            patterns: ['love', 'relationship', 'friendship', 'family'],
            responses: {
                en: ["Relationships are the essence of life! ❤️ Whether family, friends, or romantic partners, nurturing connections brings joy and meaning.", "Love and friendship require communication, trust, and understanding. Strong relationships make life beautiful!"],
                hi: ["रिश्ते जीवन का सार हैं! ❤️ चाहे परिवार, दोस्त या रोमांटिक पार्टनर हों, संबंधों का पोषण करना खुशी और अर्थ लाता है।", "प्रेम और दोस्ती को संचार, विश्वास और समझ की आवश्यकता होती है। मजबूत रिश्ते जीवन को सुंदर बनाते हैं!"]
            }
        },
        {
            patterns: ['travel', 'trip', 'vacation', 'tour', 'place'],
            responses: {
                en: ["Travel broadens horizons! ✈️ Exploring new places, cultures, and cuisines enriches life. What's your dream destination?", "The world is full of amazing places! From mountains to beaches, cities to villages. Where would you like to visit?"],
                hi: ["यात्रा क्षितिज का विस्तार करती है! ✈️ नई जगहों, संस्कृतियों का अन्वेषण जीवन को समृद्ध करता है। आपका सपनों का गंतव्य कौन सा है?", "दुनिया अद्भुत स्थानों से भरी है! पहाड़ों से समुद्र तटों तक, शहरों से गांवों तक। आप कहां जाना चाहेंगे?"]
            }
        },
        {
            patterns: ['food', 'cooking', 'recipe', 'dish', 'cuisine'],
            responses: {
                en: ["Food brings people together! 🍽️ From Italian pasta to Indian curry, world cuisines are diverse and delicious. What's your favorite dish?", "Cooking is an art and science! Experimenting with flavors and techniques creates culinary magic. Do you enjoy cooking?"],
                hi: ["भोजन लोगों को एक साथ लाता है! 🍽️ इतालवी पास्ता से भारतीय करी तक, विश्व व्यंजन विविध हैं। आपका पसंदीदा व्यंजन कौन सा है?", "खाना बनाना एक कला और विज्ञान है! स्वाद और तकनीकों के साथ प्रयोग पाक जादू पैदा करता है। क्या आप खाना बनाना पसंद करते हैं?"]
            }
        },
        {
            patterns: ['sports', 'cricket', 'football', 'basketball', 'tennis'],
            responses: {
                en: ["Sports unite people! ⚽🏏 From cricket to football, sports teach teamwork, discipline, and perseverance. What's your favorite sport?", "Athletics push human limits! Whether watching or playing, sports inspire greatness. Do you play any sports?"],
                hi: ["खेल लोगों को एकजुट करते हैं! ⚽🏏 क्रिकेट से फुटबॉल तक, खेल टीम वर्क, अनुशासन सिखाते हैं। आपका पसंदीदा खेल कौन सा है?", "एथलेटिक्स मानवीय सीमाओं को आगे बढ़ाता है! देखना हो या खेलना, खेल महानता को प्रेरित करते हैं।"]
            }
        },
        {
            patterns: ['who are you', 'what are you', 'your name', 'about you'],
            responses: {
                en: ["I'm an AI chatbot designed to help and chat with you! 🤖 I work completely offline using pattern matching. Ask me anything!", "I'm your friendly AI assistant! I can chat, answer questions, and help with various topics. All without needing internet!"],
                hi: ["मैं एक AI चैटबॉट हूं जो आपकी मदद करने के लिए डिज़ाइन किया गया है! 🤖 मैं पैटर्न मैचिंग का उपयोग करके पूरी तरह से ऑफलाइन काम करता हूं। मुझसे कुछ भी पूछें!", "मैं आपका दोस्ताना AI सहायक हूं! मैं चैट कर सकता हूं, सवालों के जवाब दे सकता हूं। सभी इंटरनेट की आवश्यकता के बिना!"]
            }
        }
    ]
};

const fallbackResponses = {
    en: [
        "That's an interesting question! I might not have a specific answer, but I'd suggest doing more research or asking an expert in that field.",
        "Hmm, I don't have detailed information on that. Could you provide more context or ask something else? 🤔",
        "That's a great topic! While I might not know everything about it, I'm always happy to discuss it further. 😊",
        "I appreciate your curiosity! I might not have the exact answer, but feel free to ask me about technology, health, education, or other topics!",
        "Interesting! I'm still learning about that. Is there something else I can help you with?"
    ],
    hi: [
        "यह एक दिलचस्प सवाल है! मेरे पास विशिष्ट जानकारी नहीं हो सकती है। क्या आप और संदर्भ दे सकते हैं? 🤔",
        "हम्म, मेरे पास इस बारे में विस्तृत जानकारी नहीं है। क्या आप कुछ और पूछ सकते हैं?",
        "यह बहुत अच्छा विषय है! मैं इस पर चर्चा करने में खुश हूं। 😊",
        "मैं आपकी जिज्ञासा की सराहना करता हूं! क्या मैं प्रौद्योगिकी, स्वास्थ्य, शिक्षा के बारे में मदद कर सकता हूं?",
        "दिलचस्प! मैं अभी भी इसके बारे में सीख रहा हूं। क्या कुछ और है जिसमें मैं मदद कर सकता हूं?"
    ]
};

// DOM Elements
const elements = {
    themeToggle: document.getElementById('themeToggle'),
    btnEnglish: document.getElementById('btnEnglish'),
    btnHindi: document.getElementById('btnHindi'),
    chatInterface: document.getElementById('chatInterface'),
    chatMessages: document.getElementById('chatMessages'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    micBtn: document.getElementById('micBtn'),
    typingIndicator: document.getElementById('typingIndicator'),
    avatar: document.getElementById('avatar'),
    avatarStatus: document.getElementById('avatarStatus'),
    voiceIndicator: document.getElementById('voiceIndicator'),
    voiceOutputToggle: document.getElementById('voiceOutputToggle'),
    clearChatBtn: document.getElementById('clearChatBtn')
};

// Speech Recognition Setup
let recognition = null;
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
}

// Speech Synthesis
let synthesis = window.speechSynthesis;

// Initialize App
function init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', appState.theme);
    updateThemeIcon();
    
    // Send greeting message
    addMessage('bot', languages[appState.language].greeting);
    updateAvatarStatus('Ready');
    
    // Event Listeners
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.btnEnglish.addEventListener('click', () => switchLanguage('en'));
    elements.btnHindi.addEventListener('click', () => switchLanguage('hi'));
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    elements.micBtn.addEventListener('click', toggleVoiceRecognition);
    elements.voiceOutputToggle.addEventListener('change', (e) => {
        appState.voiceOutputEnabled = e.target.checked;
    });
    elements.clearChatBtn.addEventListener('click', clearChat);
    
    // Setup speech recognition if available
    if (recognition) {
        setupSpeechRecognition();
    } else {
        elements.micBtn.style.display = 'none';
    }
}

// Theme Management
function toggleTheme() {
    appState.theme = appState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', appState.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = elements.themeToggle.querySelector('.theme-icon');
    icon.textContent = appState.theme === 'light' ? '🌙' : '☀️';
}

// Language Management
function switchLanguage(lang) {
    appState.language = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (lang === 'en') {
        elements.btnEnglish.classList.add('active');
        elements.messageInput.placeholder = 'Type your message...';
    } else {
        elements.btnHindi.classList.add('active');
        elements.messageInput.placeholder = 'अपना संदेश लिखें...';
    }
    
    // Update speech recognition language
    if (recognition) {
        recognition.lang = languages[lang].code;
    }
}

// Pattern Matching Engine
function detectLanguage(text) {
    // Check for Hindi characters (Devanagari script)
    const hindiPattern = /[\u0900-\u097F]/;
    return hindiPattern.test(text) ? 'hi' : 'en';
}

function extractKeywords(text) {
    // Convert to lowercase and remove punctuation
    const cleaned = text.toLowerCase().replace(/[^a-z0-9\s\u0900-\u097F]/g, ' ');
    return cleaned.split(/\s+/).filter(word => word.length > 2);
}

function findBestMatch(userMessage) {
    const keywords = extractKeywords(userMessage);
    const messageLower = userMessage.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;
    
    // Search through all categories
    for (const category in knowledgeBase) {
        for (const entry of knowledgeBase[category]) {
            let score = 0;
            
            // Check if any pattern matches
            for (const pattern of entry.patterns) {
                if (messageLower.includes(pattern.toLowerCase())) {
                    score += 10; // High score for direct pattern match
                }
                
                // Check keyword matches
                const patternWords = pattern.toLowerCase().split(/\s+/);
                for (const keyword of keywords) {
                    if (patternWords.includes(keyword)) {
                        score += 3;
                    }
                }
            }
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = entry;
            }
        }
    }
    
    // Return match only if score is significant
    return highestScore > 5 ? bestMatch : null;
}

function getResponse(userMessage) {
    const detectedLang = detectLanguage(userMessage);
    const responseLang = appState.language; // Use selected language for response
    
    // Find best matching response
    const match = findBestMatch(userMessage);
    
    if (match && match.responses[responseLang]) {
        // Return random response from matched patterns
        const responses = match.responses[responseLang];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Return fallback response
    const fallbacks = fallbackResponses[responseLang];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Message Management
function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    elements.chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    
    // Speak the message if it's from bot and voice output is enabled
    if (type === 'bot' && appState.voiceOutputEnabled) {
        speakText(content);
    }
}

function clearChat() {
    elements.chatMessages.innerHTML = '';
    appState.conversationHistory = [];
    addMessage('bot', languages[appState.language].greeting);
}

// Send Message
function sendMessage() {
    const message = elements.messageInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage('user', message);
    elements.messageInput.value = '';
    
    // Update avatar state
    updateAvatarState('thinking');
    updateAvatarStatus('Thinking...');
    
    // Show typing indicator
    elements.typingIndicator.style.display = 'flex';
    
    // Add to conversation history
    appState.conversationHistory.push({
        role: 'user',
        content: message
    });
    
    // Simulate thinking delay for natural feel
    setTimeout(() => {
        // Get response from pattern matching
        const response = getResponse(message);
        
        // Hide typing indicator
        elements.typingIndicator.style.display = 'none';
        
        // Add bot response
        addMessage('bot', response);
        
        // Add to conversation history
        appState.conversationHistory.push({
            role: 'assistant',
            content: response
        });
        
        // Update avatar state
        updateAvatarState('speaking');
        updateAvatarStatus('Speaking...');
        
        // Reset avatar after speaking
        setTimeout(() => {
            updateAvatarState('neutral');
            updateAvatarStatus('Ready');
        }, 2000);
    }, 800); // Simulate processing time
}

// Avatar State Management
function updateAvatarState(state) {
    elements.avatar.className = `avatar ${state}`;
}

function updateAvatarStatus(status) {
    elements.avatarStatus.textContent = status;
}

// Speech Recognition
function setupSpeechRecognition() {
    recognition.lang = languages[appState.language].code;
    
    recognition.onstart = () => {
        isListening = true;
        elements.micBtn.classList.add('active');
        elements.voiceIndicator.style.display = 'flex';
        updateAvatarState('thinking');
        updateAvatarStatus('Listening...');
    };
    
    recognition.onresult = (event) => {
        let transcript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        
        elements.messageInput.value = transcript;
        
        // If final result, send the message
        if (event.results[event.results.length - 1].isFinal) {
            setTimeout(() => {
                sendMessage();
            }, 500);
        }
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        isListening = false;
        elements.micBtn.classList.remove('active');
        elements.voiceIndicator.style.display = 'none';
        updateAvatarState('neutral');
        updateAvatarStatus('Ready');
        
        if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone access to use voice input.');
        }
    };
    
    recognition.onend = () => {
        isListening = false;
        elements.micBtn.classList.remove('active');
        elements.voiceIndicator.style.display = 'none';
        updateAvatarState('neutral');
        updateAvatarStatus('Ready');
    };
}

function toggleVoiceRecognition() {
    if (!recognition) {
        alert('Speech recognition is not supported in your browser.');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

// Text-to-Speech
function speakText(text) {
    // Cancel any ongoing speech
    synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languages[appState.language].voiceCode;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to find a voice for the selected language
    const voices = synthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(languages[appState.language].code.split('-')[0]));
    
    if (voice) {
        utterance.voice = voice;
    }
    
    utterance.onstart = () => {
        updateAvatarState('speaking');
        updateAvatarStatus('Speaking...');
    };
    
    utterance.onend = () => {
        updateAvatarState('neutral');
        updateAvatarStatus('Ready');
    };
    
    synthesis.speak(utterance);
}

// Initialize voices (for speech synthesis)
if (synthesis) {
    // Load voices
    if (synthesis.getVoices().length === 0) {
        synthesis.addEventListener('voiceschanged', () => {
            synthesis.getVoices();
        });
    }
}

// Start the application
init();
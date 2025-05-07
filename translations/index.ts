import { Language } from '../stores/LanguageStore';

// Define the structure of our translations
export interface Translations {
  tutorial: {
    title: string;
    welcome: {
      title: string;
      content: string[];
    };
    basicGameplay: {
      title: string;
      content: string[];
    };
    colorFeedback: {
      title: string;
      green: string;
      yellow: string;
      gray: string;
    };
    ratingSystem: {
      title: string;
      content: string;
      green: string;
      yellow: string;
      orange: string;
      red: string;
    };
    earlyGameStrategy: {
      title: string;
      intro: string;
      tips: string[];
      example: string;
    };
    midGameStrategy: {
      title: string;
      intro: string;
      tips: string[];
      conclusion: string;
    };
    lateGameStrategy: {
      title: string;
      intro: string;
      tips: string[];
      conclusion: string;
    };
    readyToPlay: {
      title: string;
      content: string[];
    };
    buttons: {
      back: string;
      skip: string;
      next: string;
      finish: string;
    };
  };
  accessibility: {
    speak: string;
    stopSpeaking: string;
  };
}

// English translations (default)
export const en: Translations = {
  tutorial: {
    title: "Tutorial",
    welcome: {
      title: "Welcome to M.A.R.C.(LE)!",
      content: [
        "This tutorial will guide you through how to play the game and understand its features.",
        "Click \"Next\" to continue or \"Skip\" to exit the tutorial at any time."
      ]
    },
    basicGameplay: {
      title: "Basic Gameplay",
      content: [
        "The goal is to guess a 6-letter MARC-Related word in limited attempts.",
        "Type your guess using the keyboard at the bottom of the screen and press Enter to submit.",
        "The number of attempts you get depends on your chosen difficulty level."
      ]
    },
    colorFeedback: {
      title: "Color Feedback",
      green: "Green: The letter is correct and in the right position",
      yellow: "Yellow: The letter is in the word but in the wrong position",
      gray: "Gray: The letter is not in the word"
    },
    ratingSystem: {
      title: "Rating System",
      content: "Each guess is rated based on its strategic value:",
      green: "Green Rating: Excellent guess",
      yellow: "Yellow Rating: Good guess",
      orange: "Orange Rating: Decent guess",
      red: "Red Rating: Poor guess"
    },
    earlyGameStrategy: {
      title: "Early Game Strategy (Guesses 1-2)",
      intro: "In the early game, focus on discovering as many letters as possible:",
      tips: [
        "Use vowels (A, E, I, O, U) - they're highly valued",
        "Include common consonants (R, S, T, L, N, D)",
        "Avoid repeating letters to maximize information"
      ],
      example: "Example: \"EDITOR\" is a good first guess with 3 vowels and 3 common consonants."
    },
    midGameStrategy: {
      title: "Mid Game Strategy (Guesses 3-4)",
      intro: "In the mid game, use the information you've gathered:",
      tips: [
        "Place green letters (correct position) in the same spots",
        "Try yellow letters (correct letter, wrong position) in new positions",
        "Avoid using gray letters (not in the word)"
      ],
      conclusion: "Your rating will improve if you effectively use the information from previous guesses."
    },
    lateGameStrategy: {
      title: "Late Game Strategy (Guesses 5+)",
      intro: "In the late game, focus on finding the exact word:",
      tips: [
        "Use all known information (green and yellow letters)",
        "Try different combinations of the letters you know are in the word",
        "Reusing letters marked as incorrect will lower your score"
      ],
      conclusion: "The highest ratings go to guesses that make the best use of all available information."
    },
    readyToPlay: {
      title: "You're Ready to Play!",
      content: [
        "Now you understand how to play M.A.R.C.(LE) and how your guesses are rated.",
        "Remember, the goal is to guess the word in as few attempts as possible.",
        "Good luck and have fun!"
      ]
    },
    buttons: {
      back: "Back",
      skip: "Skip",
      next: "Next",
      finish: "Finish"
    }
  },
  accessibility: {
    speak: "Read aloud",
    stopSpeaking: "Stop reading"
  }
};

// Spanish translations
export const es: Translations = {
  tutorial: {
    title: "Tutorial",
    welcome: {
      title: "¡Bienvenido a M.A.R.C.(LE)!",
      content: [
        "Este tutorial te guiará sobre cómo jugar y entender sus características.",
        "Haz clic en \"Siguiente\" para continuar o \"Saltar\" para salir del tutorial en cualquier momento."
      ]
    },
    basicGameplay: {
      title: "Juego Básico",
      content: [
        "El objetivo es adivinar una palabra de 6 letras relacionada con MARC en intentos limitados.",
        "Escribe tu suposición usando el teclado en la parte inferior de la pantalla y presiona Enter para enviar.",
        "El número de intentos que obtienes depende del nivel de dificultad elegido."
      ]
    },
    colorFeedback: {
      title: "Retroalimentación de Color",
      green: "Verde: La letra es correcta y está en la posición correcta",
      yellow: "Amarillo: La letra está en la palabra pero en la posición incorrecta",
      gray: "Gris: La letra no está en la palabra"
    },
    ratingSystem: {
      title: "Sistema de Calificación",
      content: "Cada suposición se califica según su valor estratégico:",
      green: "Calificación Verde: Excelente suposición",
      yellow: "Calificación Amarilla: Buena suposición",
      orange: "Calificación Naranja: Suposición decente",
      red: "Calificación Roja: Suposición pobre"
    },
    earlyGameStrategy: {
      title: "Estrategia de Inicio (Suposiciones 1-2)",
      intro: "Al principio, concéntrate en descubrir tantas letras como sea posible:",
      tips: [
        "Usa vocales (A, E, I, O, U) - son muy valiosas",
        "Incluye consonantes comunes (R, S, T, L, N, D)",
        "Evita repetir letras para maximizar la información"
      ],
      example: "Ejemplo: \"EDITOR\" es una buena primera suposición con 3 vocales y 3 consonantes comunes."
    },
    midGameStrategy: {
      title: "Estrategia Media (Suposiciones 3-4)",
      intro: "En la mitad del juego, usa la información que has reunido:",
      tips: [
        "Coloca letras verdes (posición correcta) en los mismos lugares",
        "Prueba letras amarillas (letra correcta, posición incorrecta) en nuevas posiciones",
        "Evita usar letras grises (no están en la palabra)"
      ],
      conclusion: "Tu calificación mejorará si usas efectivamente la información de suposiciones anteriores."
    },
    lateGameStrategy: {
      title: "Estrategia Final (Suposiciones 5+)",
      intro: "En la fase final, concéntrate en encontrar la palabra exacta:",
      tips: [
        "Usa toda la información conocida (letras verdes y amarillas)",
        "Prueba diferentes combinaciones de las letras que sabes que están en la palabra",
        "Reutilizar letras marcadas como incorrectas reducirá tu puntuación"
      ],
      conclusion: "Las calificaciones más altas van a las suposiciones que hacen el mejor uso de toda la información disponible."
    },
    readyToPlay: {
      title: "¡Estás Listo para Jugar!",
      content: [
        "Ahora entiendes cómo jugar M.A.R.C.(LE) y cómo se califican tus suposiciones.",
        "Recuerda, el objetivo es adivinar la palabra en la menor cantidad de intentos posible.",
        "¡Buena suerte y diviértete!"
      ]
    },
    buttons: {
      back: "Atrás",
      skip: "Saltar",
      next: "Siguiente",
      finish: "Terminar"
    }
  },
  accessibility: {
    speak: "Leer en voz alta",
    stopSpeaking: "Dejar de leer"
  }
};


export const zh: Translations = {
    tutorial: {
      title: "教程",
      welcome: {
        title: "欢迎来到 M.A.R.C.(LE)！",
        content: [
          "本教程将指导您如何玩游戏并了解其功能。",
          "点击“下一步”继续，或点击“跳过”随时退出教程。"
        ]
      },
      basicGameplay: {
        title: "基础玩法",
        content: [
          "目标是在有限的尝试次数内猜出一个与 MARC 相关的六字母单词。",
          "使用屏幕底部的键盘输入您的猜测，然后按回车键提交。",
          "尝试次数取决于您选择的难度级别。"
        ]
      },
      colorFeedback: {
        title: "颜色反馈",
        green: "绿色: 字母正确且位置正确",
        yellow: "黄色: 字母在单词中但位置不正确",
        gray: "灰色: 字母不在单词中"
      },
      ratingSystem: {
        title: "评分系统",
        content: "每次猜测都会根据其策略价值进行评分：",
        green: "绿色评分：优秀猜测",
        yellow: "黄色评分：良好猜测",
        orange: "橙色评分：一般猜测",
        red: "红色评分：较差猜测"
      },
      earlyGameStrategy: {
        title: "前期策略（第1-2次猜测）",
        intro: "游戏初期应专注于尽可能多地识别字母：",
        tips: [
          "使用元音（A、E、I、O、U）——它们非常有价值",
          "包含常见辅音（R、S、T、L、N、D）",
          "避免重复使用字母，以获取更多信息"
        ],
        example: "示例：\"EDITOR\" 是一个不错的首猜，包含3个元音和3个常见辅音。"
      },
      midGameStrategy: {
        title: "中期策略（第3-4次猜测）",
        intro: "在中期，应利用已收集的信息：",
        tips: [
          "将绿色字母放在相同的位置",
          "尝试将黄色字母放在新的位置",
          "避免使用灰色字母（即不在单词中的字母）"
        ],
        conclusion: "如果能有效使用前几轮的信息，您的评分将有所提升。"
      },
      lateGameStrategy: {
        title: "后期策略（第5次及以后）",
        intro: "后期阶段应专注于准确猜出单词：",
        tips: [
          "使用所有已知信息（绿色和黄色字母）",
          "尝试不同组合以拼出可能的单词",
          "重复使用错误的字母将降低得分"
        ],
        conclusion: "评分最高的猜测是那些最充分利用所有已知信息的猜测。"
      },
      readyToPlay: {
        title: "您已准备好开始游戏！",
        content: [
          "现在您已经了解了如何玩 M.A.R.C.(LE) 以及猜测是如何评分的。",
          "请记住，目标是在尽可能少的尝试中猜出正确的单词。",
          "祝您好运，玩得开心！"
        ]
      },
      buttons: {
        back: "返回",
        skip: "跳过",
        next: "下一步",
        finish: "完成"
      }
    },
    accessibility: {
      speak: "朗读",
      stopSpeaking: "停止朗读"
    }
  };
  
  
  export const tl: Translations = {
    tutorial: {
      title: "Tutorial",
      welcome: {
        title: "Maligayang pagdating sa M.A.R.C.(LE)!",
        content: [
          "Ang tutorial na ito ay gagabay sa iyo kung paano laruin ang laro at maunawaan ang mga tampok nito.",
          "I-click ang \"Susunod\" upang magpatuloy o \"Laktawan\" upang lumabas sa tutorial anumang oras."
        ]
      },
      basicGameplay: {
        title: "Pangunahing Gameplay",
        content: [
          "Ang layunin ay hulaan ang isang 6-na letra na salitang may kaugnayan sa MARC sa limitadong bilang ng pagtatangka.",
          "I-type ang iyong hula gamit ang keyboard sa ibaba ng screen at pindutin ang Enter upang isumite.",
          "Ang bilang ng mga pagtatangka ay nakadepende sa napiling antas ng kahirapan."
        ]
      },
      colorFeedback: {
        title: "Puna ng Kulay",
        green: "Berde: Tama ang letra at nasa tamang posisyon",
        yellow: "Dilaw: Ang letra ay nasa salita ngunit nasa maling posisyon",
        gray: "Abo: Ang letra ay wala sa salita"
      },
      ratingSystem: {
        title: "Sistema ng Rating",
        content: "Ang bawat hula ay niraranggo batay sa estratehikong halaga nito:",
        green: "Berdeng Rating: Napakahusay na hula",
        yellow: "Dilaw na Rating: Magandang hula",
        orange: "Kahel na Rating: Katamtamang hula",
        red: "Pulang Rating: Mahinang hula"
      },
      earlyGameStrategy: {
        title: "Maagang Estratehiya (Mga Hula 1-2)",
        intro: "Sa maagang bahagi ng laro, magpokus sa pagtuklas ng maraming letra hangga't maaari:",
        tips: [
          "Gumamit ng mga patinig (A, E, I, O, U) - mataas ang halaga ng mga ito",
          "Isama ang mga karaniwang katinig (R, S, T, L, N, D)",
          "Iwasan ang pag-uulit ng mga letra upang makakuha ng mas maraming impormasyon"
        ],
        example: "Halimbawa: \"EDITOR\" ay isang magandang unang hula na may 3 patinig at 3 karaniwang katinig."
      },
      midGameStrategy: {
        title: "Gitnang Estratehiya (Mga Hula 3-4)",
        intro: "Sa gitnang bahagi ng laro, gamitin ang impormasyong iyong nakalap:",
        tips: [
          "Ilagay ang mga berdeng letra (tamang posisyon) sa parehong mga lugar",
          "Subukan ang mga dilaw na letra (tamang letra, maling posisyon) sa mga bagong posisyon",
          "Iwasan ang paggamit ng mga abong letra (wala sa salita)"
        ],
        conclusion: "Ang iyong rating ay mapapabuti kung epektibong gagamitin ang impormasyon mula sa mga nakaraang hula."
      },
      lateGameStrategy: {
        title: "Huling Estratehiya (Mga Hula 5+)",
        intro: "Sa huling bahagi ng laro, magpokus sa paghahanap ng eksaktong salita:",
        tips: [
          "Gamitin ang lahat ng kilalang impormasyon (berde at dilaw na mga letra)",
          "Subukan ang iba't ibang kombinasyon ng mga letrang alam mong nasa salita",
          "Ang muling paggamit ng mga letrang markadong mali ay magpapababa ng iyong iskor"
        ],
        conclusion: "Ang pinakamataas na rating ay ibinibigay sa mga hulang pinakamahusay na gumagamit ng lahat ng magagamit na impormasyon."
      },
      readyToPlay: {
        title: "Handa Ka Nang Maglaro!",
        content: [
          "Ngayon ay naiintindihan mo na kung paano laruin ang M.A.R.C.(LE) at kung paano niraranggo ang iyong mga hula.",
          "Tandaan, ang layunin ay hulaan ang salita sa pinakamaliit na bilang ng pagtatangka.",
          "Good luck at magsaya!"
        ]
      },
      buttons: {
        back: "Bumalik",
        skip: "Laktawan",
        next: "Susunod",
        finish: "Tapos"
      }
    },
    accessibility: {
      speak: "Basahin nang malakas",
      stopSpeaking: "Itigil ang pagbasa"
    }
  };
  
  export const vi: Translations = {
    tutorial: {
      title: "Hướng dẫn",
      welcome: {
        title: "Chào mừng đến với M.A.R.C.(LE)!",
        content: [
          "Hướng dẫn này sẽ giúp bạn hiểu cách chơi trò chơi và các tính năng của nó.",
          "Nhấn \"Tiếp theo\" để tiếp tục hoặc \"Bỏ qua\" để thoát khỏi hướng dẫn bất kỳ lúc nào."
        ]
      },
      basicGameplay: {
        title: "Cách chơi cơ bản",
        content: [
          "Mục tiêu là đoán một từ gồm 6 chữ cái liên quan đến MARC trong số lần thử giới hạn.",
          "Nhập từ bạn đoán bằng bàn phím ở dưới cùng màn hình và nhấn Enter để gửi.",
          "Số lần thử bạn có phụ thuộc vào mức độ khó bạn chọn."
        ]
      },
      colorFeedback: {
        title: "Phản hồi màu sắc",
        green: "Xanh lá: Chữ cái đúng và ở đúng vị trí",
        yellow: "Vàng: Chữ cái có trong từ nhưng ở vị trí sai",
        gray: "Xám: Chữ cái không có trong từ"
      },
      ratingSystem: {
        title: "Hệ thống đánh giá",
        content: "Mỗi lần đoán được đánh giá dựa trên giá trị chiến lược của nó:",
        green: "Đánh giá Xanh lá: Đoán xuất sắc",
        yellow: "Đánh giá Vàng: Đoán tốt",
        orange: "Đánh giá Cam: Đoán tạm được",
        red: "Đánh giá Đỏ: Đoán kém"
      },
      earlyGameStrategy: {
        title: "Chiến lược đầu game (Lượt đoán 1-2)",
        intro: "Ở giai đoạn đầu, hãy tập trung vào việc khám phá càng nhiều chữ cái càng tốt:",
        tips: [
          "Sử dụng nguyên âm (A, E, I, O, U) - chúng rất có giá trị",
          "Bao gồm các phụ âm phổ biến (R, S, T, L, N, D)",
          "Tránh lặp lại chữ cái để tối đa hóa thông tin"
        ],
        example: "Ví dụ: \"EDITOR\" là một lựa chọn đầu tiên tốt với 3 nguyên âm và 3 phụ âm phổ biến."
      },
      midGameStrategy: {
        title: "Chiến lược giữa game (Lượt đoán 3-4)",
        intro: "Ở giai đoạn giữa, sử dụng thông tin bạn đã thu thập được:",
        tips: [
          "Giữ nguyên vị trí các chữ cái xanh lá (đúng vị trí)",
          "Thử các chữ cái vàng (đúng chữ cái, sai vị trí) ở vị trí mới",
          "Tránh sử dụng các chữ cái xám (không có trong từ)"
        ],
        conclusion: "Đánh giá của bạn sẽ được cải thiện nếu bạn sử dụng hiệu quả thông tin từ các lượt đoán trước."
      },
      lateGameStrategy: {
        title: "Chiến lược cuối game (Lượt đoán 5+)",
        intro: "Ở giai đoạn cuối, tập trung vào việc tìm ra từ chính xác:",
        tips: [
          "Sử dụng tất cả thông tin đã biết (chữ cái xanh lá và vàng)",
          "Thử các kết hợp khác nhau của các chữ cái bạn biết có trong từ",
          "Sử dụng lại các chữ cái đã được đánh dấu là sai sẽ làm giảm điểm của bạn"
        ],
        conclusion: "Những lượt đoán tận dụng tốt nhất tất cả thông tin có sẵn sẽ nhận được đánh giá cao nhất."
      },
      readyToPlay: {
        title: "Bạn đã sẵn sàng chơi!",
        content: [
          "Bây giờ bạn đã hiểu cách chơi M.A.R.C.(LE) và cách đánh giá các lượt đoán.",
          "Hãy nhớ, mục tiêu là đoán từ trong số lần thử ít nhất có thể.",
          "Chúc bạn may mắn và chơi vui vẻ!"
        ]
      },
      buttons: {
        back: "Quay lại",
        skip: "Bỏ qua",
        next: "Tiếp theo",
        finish: "Hoàn thành"
      }
    },
    accessibility: {
      speak: "Đọc to",
      stopSpeaking: "Dừng đọc"
    }
  };


  export const fr: Translations = {
    tutorial: {
      title: "Tutoriel",
      welcome: {
        title: "Bienvenue sur M.A.R.C.(LE) !",
        content: [
          "Ce tutoriel vous guidera pour apprendre à jouer et comprendre les fonctionnalités du jeu.",
          "Cliquez sur \"Suivant\" pour continuer ou sur \"Passer\" pour quitter le tutoriel à tout moment."
        ]
      },
      basicGameplay: {
        title: "Jouabilité de base",
        content: [
          "L'objectif est de deviner un mot de 6 lettres lié à MARC en un nombre limité d'essais.",
          "Tapez votre proposition à l'aide du clavier en bas de l'écran et appuyez sur Entrée pour valider.",
          "Le nombre d'essais dépend du niveau de difficulté choisi."
        ]
      },
      colorFeedback: {
        title: "Retour visuel",
        green: "Vert : La lettre est correcte et bien placée",
        yellow: "Jaune : La lettre est dans le mot mais mal placée",
        gray: "Gris : La lettre n'est pas dans le mot"
      },
      ratingSystem: {
        title: "Système de notation",
        content: "Chaque proposition est notée selon sa valeur stratégique :",
        green: "Note verte : Excellente proposition",
        yellow: "Note jaune : Bonne proposition",
        orange: "Note orange : Proposition correcte",
        red: "Note rouge : Mauvaise proposition"
      },
      earlyGameStrategy: {
        title: "Stratégie de début de partie (Essais 1-2)",
        intro: "Au début, concentrez-vous sur la découverte de lettres :",
        tips: [
          "Utilisez des voyelles (A, E, I, O, U) - elles sont très utiles",
          "Incluez des consonnes courantes (R, S, T, L, N, D)",
          "Évitez de répéter des lettres pour maximiser les informations"
        ],
        example: "Exemple : \"EDITOR\" est un bon premier mot avec 3 voyelles et 3 consonnes fréquentes."
      },
      midGameStrategy: {
        title: "Stratégie de milieu de partie (Essais 3-4)",
        intro: "Utilisez les informations obtenues lors des essais précédents :",
        tips: [
          "Conservez les lettres vertes à leur position",
          "Essayez les lettres jaunes à de nouvelles positions",
          "Évitez les lettres grises"
        ],
        conclusion: "Votre note s'améliorera si vous exploitez efficacement les informations précédentes."
      },
      lateGameStrategy: {
        title: "Stratégie de fin de partie (Essais 5+)",
        intro: "Concentrez-vous sur la découverte du mot exact :",
        tips: [
          "Utilisez toutes les informations connues (lettres vertes et jaunes)",
          "Essayez différentes combinaisons des lettres connues",
          "Réutiliser des lettres incorrectes réduira votre score"
        ],
        conclusion: "Les meilleures notes sont attribuées aux propositions exploitant au mieux toutes les informations disponibles."
      },
      readyToPlay: {
        title: "Vous êtes prêt à jouer !",
        content: [
          "Vous savez maintenant comment jouer à M.A.R.C.(LE) et comment vos propositions sont notées.",
          "N'oubliez pas, l'objectif est de deviner le mot en un minimum d'essais.",
          "Bonne chance et amusez-vous bien !"
        ]
      },
      buttons: {
        back: "Retour",
        skip: "Passer",
        next: "Suivant",
        finish: "Terminer"
      }
    },
    accessibility: {
      speak: "Lire à haute voix",
      stopSpeaking: "Arrêter la lecture"
    }
  };
  
  export const ar: Translations = {
    tutorial: {
      title: "الدليل التعليمي",
      welcome: {
        title: "مرحبًا بك في M.A.R.C.(LE)!",
        content: [
          "سيرشدك هذا الدليل التعليمي خلال كيفية لعب اللعبة وفهم ميزاتها.",
          "انقر على \"التالي\" للمتابعة أو \"تخطي\" للخروج من الدليل في أي وقت."
        ]
      },
      basicGameplay: {
        title: "أساسيات اللعب",
        content: [
          "الهدف هو تخمين كلمة مكونة من 6 أحرف مرتبطة بـ MARC في عدد محدود من المحاولات.",
          "اكتب تخمينك باستخدام لوحة المفاتيح في أسفل الشاشة واضغط على Enter للإرسال.",
          "يعتمد عدد المحاولات المتاحة على مستوى الصعوبة الذي تختاره."
        ]
      },
      colorFeedback: {
        title: "ردود الفعل بالألوان",
        green: "أخضر: الحرف صحيح وفي الموضع الصحيح",
        yellow: "أصفر: الحرف موجود في الكلمة ولكن في الموضع الخطأ",
        gray: "رمادي: الحرف غير موجود في الكلمة"
      },
      ratingSystem: {
        title: "نظام التقييم",
        content: "يتم تقييم كل تخمين بناءً على قيمته الاستراتيجية:",
        green: "تقييم أخضر: تخمين ممتاز",
        yellow: "تقييم أصفر: تخمين جيد",
        orange: "تقييم برتقالي: تخمين مقبول",
        red: "تقييم أحمر: تخمين ضعيف"
      },
      earlyGameStrategy: {
        title: "استراتيجية اللعبة المبكرة (التخمينات 1-2)",
        intro: "في بداية اللعبة، ركز على اكتشاف أكبر عدد ممكن من الحروف:",
        tips: [
          "استخدم الحروف المتحركة (A، E، I، O، U) - فهي ذات قيمة عالية",
          "قم بتضمين الحروف الساكنة الشائعة (R، S، T، L، N، D)",
          "تجنب تكرار الحروف لتعظيم كمية المعلومات"
        ],
        example: "مثال: \"EDITOR\" هو تخمين أول جيد يحتوي على 3 حروف متحركة و3 حروف ساكنة شائعة."
      },
      midGameStrategy: {
        title: "استراتيجية منتصف اللعبة (التخمينات 3-4)",
        intro: "في منتصف اللعبة، استخدم المعلومات التي جمعتها:",
        tips: [
          "ضع الحروف الخضراء (الموقع الصحيح) في نفس المواضع",
          "جرب الحروف الصفراء (الحرف الصحيح، الموضع الخطأ) في مواضع جديدة",
          "تجنب استخدام الحروف الرمادية (غير موجودة في الكلمة)"
        ],
        conclusion: "سيتحسن تقييمك إذا استخدمت المعلومات من التخمينات السابقة بفعالية."
      },
      lateGameStrategy: {
        title: "استراتيجية نهاية اللعبة (التخمينات 5+)",
        intro: "في نهاية اللعبة، ركز على العثور على الكلمة الدقيقة:",
        tips: [
          "استخدم جميع المعلومات المعروفة (الحروف الخضراء والصفراء)",
          "جرب تركيبات مختلفة من الحروف التي تعرف أنها موجودة في الكلمة",
          "إعادة استخدام الحروف التي تم تحديدها على أنها غير صحيحة سيؤدي إلى خفض درجاتك"
        ],
        conclusion: "أعلى التقييمات تُمنح للتخمينات التي تستفيد بشكل أفضل من جميع المعلومات المتاحة."
      },
      readyToPlay: {
        title: "أنت جاهز للعب!",
        content: [
          "الآن تفهم كيفية لعب M.A.R.C.(LE) وكيفية تقييم تخميناتك.",
          "تذكر، الهدف هو تخمين الكلمة في أقل عدد ممكن من المحاولات.",
          "حظًا سعيدًا واستمتع باللعب!"
        ]
      },
      buttons: {
        back: "رجوع",
        skip: "تخطي",
        next: "التالي",
        finish: "إنهاء"
      }
    },
    accessibility: {
      speak: "قراءة بصوت عالٍ",
      stopSpeaking: "إيقاف القراءة"
    }
  };
  

  export const ko: Translations = {
    tutorial: {
      title: "튜토리얼",
      welcome: {
        title: "M.A.R.C.(LE)에 오신 것을 환영합니다!",
        content: [
          "이 튜토리얼은 게임을 플레이하는 방법과 기능을 이해하는 데 도움을 줄 것입니다.",
          "\"다음\"을 클릭하여 계속하거나 언제든지 \"건너뛰기\"를 클릭하여 튜토리얼을 종료할 수 있습니다."
        ]
      },
      basicGameplay: {
        title: "기본 게임플레이",
        content: [
          "목표는 제한된 시도 내에 MARC와 관련된 6글자 단어를 추측하는 것입니다.",
          "화면 하단의 키보드를 사용하여 추측한 단어를 입력하고 Enter 키를 눌러 제출하세요.",
          "시도 횟수는 선택한 난이도에 따라 다릅니다."
        ]
      },
      colorFeedback: {
        title: "색상 피드백",
        green: "초록색: 글자가 정확하고 위치도 정확함",
        yellow: "노란색: 글자가 단어에 있지만 위치가 틀림",
        gray: "회색: 글자가 단어에 없음"
      },
      ratingSystem: {
        title: "평가 시스템",
        content: "각 추측은 전략적 가치에 따라 평가됩니다:",
        green: "초록색 평가: 훌륭한 추측",
        yellow: "노란색 평가: 좋은 추측",
        orange: "주황색 평가: 괜찮은 추측",
        red: "빨간색 평가: 좋지 않은 추측"
      },
      earlyGameStrategy: {
        title: "초반 전략 (1~2번째 추측)",
        intro: "초반에는 가능한 많은 글자를 발견하는 데 집중하세요:",
        tips: [
          "모음(A, E, I, O, U)을 사용하세요 - 매우 중요합니다",
          "일반적인 자음(R, S, T, L, N, D)을 포함하세요",
          "정보를 최대화하기 위해 글자 반복을 피하세요"
        ],
        example: "예시: \"EDITOR\"는 3개의 모음과 3개의 일반 자음이 포함된 좋은 첫 추측입니다."
      },
      midGameStrategy: {
        title: "중반 전략 (3~4번째 추측)",
        intro: "중반에는 수집한 정보를 활용하세요:",
        tips: [
          "초록색 글자(정확한 위치)는 동일한 위치에 유지하세요",
          "노란색 글자(정확한 글자, 틀린 위치)는 새로운 위치에 시도하세요",
          "회색 글자(단어에 없음)는 사용하지 마세요"
        ],
        conclusion: "이전 추측에서 얻은 정보를 효과적으로 사용하면 평가가 향상됩니다."
      },
      lateGameStrategy: {
        title: "후반 전략 (5번째 이상 추측)",
        intro: "후반에는 정확한 단어를 찾는 데 집중하세요:",
        tips: [
          "알려진 모든 정보(초록색 및 노란색 글자)를 사용하세요",
          "단어에 있는 것으로 알려진 글자의 다양한 조합을 시도하세요",
          "잘못된 것으로 표시된 글자를 다시 사용하면 점수가 낮아집니다"
        ],
        conclusion: "모든 사용 가능한 정보를 최적으로 활용한 추측이 가장 높은 평가를 받습니다."
      },
      readyToPlay: {
        title: "이제 게임을 시작할 준비가 되었습니다!",
        content: [
          "이제 M.A.R.C.(LE)를 플레이하는 방법과 추측이 어떻게 평가되는지 이해하셨습니다.",
          "목표는 가능한 적은 시도 횟수로 단어를 맞추는 것입니다.",
          "행운을 빌며 즐겁게 플레이하세요!"
        ]
      },
      buttons: {
        back: "뒤로",
        skip: "건너뛰기",
        next: "다음",
        finish: "완료"
      }
    },
    accessibility: {
      speak: "음성으로 읽기",
      stopSpeaking: "읽기 중지"
    }
  };
  
  export const ru: Translations = {
    tutorial: {
      title: "Обучение",
      welcome: {
        title: "Добро пожаловать в M.A.R.C.(LE)!",
        content: [
          "Это обучение покажет вам, как играть в игру и использовать её функции.",
          "Нажмите «Далее» для продолжения или «Пропустить», чтобы выйти из обучения в любой момент."
        ]
      },
      basicGameplay: {
        title: "Основы игры",
        content: [
          "Цель — угадать 6-буквенное слово, связанное с MARC, за ограниченное количество попыток.",
          "Введите ваше предположение с помощью клавиатуры внизу экрана и нажмите Enter для отправки.",
          "Количество попыток зависит от выбранного уровня сложности."
        ]
      },
      colorFeedback: {
        title: "Цветовая обратная связь",
        green: "Зелёный: Буква верна и на правильном месте",
        yellow: "Жёлтый: Буква есть в слове, но не на своём месте",
        gray: "Серый: Буквы нет в слове"
      },
      ratingSystem: {
        title: "Система оценки",
        content: "Каждое предположение оценивается по его стратегической ценности:",
        green: "Зелёный рейтинг: Отличное предположение",
        yellow: "Жёлтый рейтинг: Хорошее предположение",
        orange: "Оранжевый рейтинг: Неплохое предположение",
        red: "Красный рейтинг: Плохое предположение"
      },
      earlyGameStrategy: {
        title: "Ранняя стратегия (попытки 1–2)",
        intro: "В начале игры сосредоточьтесь на выявлении как можно большего количества букв:",
        tips: [
          "Используйте гласные (A, E, I, O, U) — они очень ценны",
          "Добавьте распространённые согласные (R, S, T, L, N, D)",
          "Избегайте повторяющихся букв для максимального количества информации"
        ],
        example: "Пример: \"EDITOR\" — хороший первый вариант с 3 гласными и 3 распространёнными согласными."
      },
      midGameStrategy: {
        title: "Средняя стратегия (попытки 3–4)",
        intro: "Используйте собранную вами информацию:",
        tips: [
          "Ставьте зелёные буквы в те же позиции",
          "Пробуйте жёлтые буквы на новых позициях",
          "Избегайте серых букв (их нет в слове)"
        ],
        conclusion: "Оценка будет выше, если вы эффективно используете информацию из предыдущих попыток."
      },
      lateGameStrategy: {
        title: "Поздняя стратегия (попытки 5+)",
        intro: "Сосредоточьтесь на точном угадывании слова:",
        tips: [
          "Используйте все известные данные (зелёные и жёлтые буквы)",
          "Пробуйте разные комбинации известных букв",
          "Повторное использование ошибочных букв снизит ваш результат"
        ],
        conclusion: "Высшие оценки получают предположения, максимально использующие всю доступную информацию."
      },
      readyToPlay: {
        title: "Вы готовы играть!",
        content: [
          "Теперь вы знаете, как играть в M.A.R.C.(LE) и как оцениваются ваши предположения.",
          "Помните, цель — угадать слово за минимальное количество попыток.",
          "Удачи и приятной игры!"
        ]
      },
      buttons: {
        back: "Назад",
        skip: "Пропустить",
        next: "Далее",
        finish: "Завершить"
      }
    },
    accessibility: {
      speak: "Читать вслух",
      stopSpeaking: "Остановить чтение"
    }
  };
  

  export const de: Translations = {
    tutorial: {
      title: "Tutorial",
      welcome: {
        title: "Willkommen bei M.A.R.C.(LE)!",
        content: [
          "Dieses Tutorial zeigt dir, wie du das Spiel spielst und seine Funktionen verstehst.",
          "Klicke auf \"Weiter\", um fortzufahren, oder auf \"Überspringen\", um das Tutorial jederzeit zu beenden."
        ]
      },
      basicGameplay: {
        title: "Grundlegendes Gameplay",
        content: [
          "Ziel ist es, ein 6-buchstabiges MARC-bezogenes Wort mit begrenzten Versuchen zu erraten.",
          "Gib deinen Tipp über die Tastatur am unteren Bildschirmrand ein und drücke Enter zum Absenden.",
          "Die Anzahl der Versuche hängt vom gewählten Schwierigkeitsgrad ab."
        ]
      },
      colorFeedback: {
        title: "Farbliches Feedback",
        green: "Grün: Der Buchstabe ist korrekt und an der richtigen Position",
        yellow: "Gelb: Der Buchstabe ist im Wort, aber an der falschen Position",
        gray: "Grau: Der Buchstabe ist nicht im Wort enthalten"
      },
      ratingSystem: {
        title: "Bewertungssystem",
        content: "Jeder Tipp wird basierend auf seinem strategischen Wert bewertet:",
        green: "Grüne Bewertung: Hervorragender Tipp",
        yellow: "Gelbe Bewertung: Guter Tipp",
        orange: "Orange Bewertung: Solider Tipp",
        red: "Rote Bewertung: Schlechter Tipp"
      },
      earlyGameStrategy: {
        title: "Frühspielstrategie (Versuche 1–2)",
        intro: "Konzentriere dich zu Beginn darauf, möglichst viele Buchstaben zu entdecken:",
        tips: [
          "Verwende Vokale (A, E, I, O, U) – sie sind besonders wertvoll",
          "Nutze häufige Konsonanten (R, S, T, L, N, D)",
          "Vermeide doppelte Buchstaben, um mehr Informationen zu erhalten"
        ],
        example: "Beispiel: \"EDITOR\" ist ein guter erster Tipp mit 3 Vokalen und 3 häufigen Konsonanten."
      },
      midGameStrategy: {
        title: "Mittelspielstrategie (Versuche 3–4)",
        intro: "Nutze die bisher gesammelten Informationen:",
        tips: [
          "Setze grüne Buchstaben an dieselben Stellen",
          "Probiere gelbe Buchstaben an neuen Positionen aus",
          "Vermeide graue Buchstaben, da sie nicht im Wort enthalten sind"
        ],
        conclusion: "Deine Bewertung verbessert sich, wenn du frühere Hinweise effektiv nutzt."
      },
      lateGameStrategy: {
        title: "Endspielstrategie (Versuche 5+)",
        intro: "Fokussiere dich darauf, das genaue Wort zu finden:",
        tips: [
          "Verwende alle bekannten Informationen (grüne und gelbe Buchstaben)",
          "Probiere verschiedene Kombinationen der bekannten Buchstaben",
          "Die Wiederverwendung falscher Buchstaben senkt deine Punktzahl"
        ],
        conclusion: "Die höchsten Bewertungen erhalten Tipps, die alle verfügbaren Informationen optimal nutzen."
      },
      readyToPlay: {
        title: "Du bist bereit zu spielen!",
        content: [
          "Jetzt weißt du, wie man M.A.R.C.(LE) spielt und wie deine Tipps bewertet werden.",
          "Denk daran: Ziel ist es, das Wort in möglichst wenigen Versuchen zu erraten.",
          "Viel Glück und hab Spaß!"
        ]
      },
      buttons: {
        back: "Zurück",
        skip: "Überspringen",
        next: "Weiter",
        finish: "Beenden"
      }
    },
    accessibility: {
      speak: "Vorlesen",
      stopSpeaking: "Vorlesen stoppen"
    }
  };

  

// Map of all translations
const translations: Record<Language, Translations> = {
  en,
  es,
  zh, // Placeholder - replace with actual Chinese translations
  tl, // Placeholder - replace with actual Tagalog translations
  vi, // Placeholder - replace with actual Vietnamese translations
  fr, // Placeholder - replace with actual French translations
  ar, // Placeholder - replace with actual Arabic translations
  ko, // Placeholder - replace with actual Korean translations
  ru, // Placeholder - replace with actual Russian translations
  de  // Placeholder - replace with actual German translations
};

export default translations;
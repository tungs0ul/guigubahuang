import React, { useContext } from "react";
import { useState } from "react";

export const LanguageContext = React.createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("VN");
  const languages = ["EN", "VN", "DE"];
  const getText = (text1, text2 = null) => {
    if (text2) {
      return texts[text1][text2][language];
    }
    return texts[text1][language];
  };
  const value = {
    texts,
    language: language,
    setLanguage: setLanguage,
    languages: languages,
    getText: getText,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const texts = {
  class: {
    class: {
      VN: "Trường Phái",
      EN: "Class",
      DE: "Klasse",
    },
    Đao: {
      VN: "Đao",
      EN: "blade",
      DE: "Klinge",
    },
    Thương: {
      VN: "Thương",
      EN: "Lancer",
      DE: "Lancer",
    },
    Kiếm: {
      VN: "Kiếm",
      EN: "Sword",
      DE: "Schwert",
    },
    Quyền: {
      VN: "Quyền",
      EN: "Fist",
      DE: "Faust",
    },
    Chưởng: {
      VN: "Chưởng",
      EN: "Palm",
      DE: "Palme",
    },
    Chỉ: {
      VN: "Chỉ",
      EN: "Finger",
      DE: "Finger",
    },
    Hỏa: {
      VN: "Hỏa",
      EN: "Fire",
      DE: "Feuer",
    },
    Thủy: {
      VN: "Thủy",
      EN: "Water",
      DE: "Wasser",
    },
    Lôi: {
      VN: "Lôi",
      EN: "Thunder",
      DE: "Donner",
    },
    Phong: {
      VN: "Phong",
      EN: "Wind",
      DE: "Wind",
    },
    Thổ: {
      VN: "Thổ",
      EN: "Earth",
      DE: "Erde",
    },
    Mộc: {
      VN: "Mộc",
      EN: "Plant",
      DE: "Pflanze",
    },
  },
  home: {
    VN: "Trang Chủ",
    EN: "Home",
    DE: "Hauptseite",
  },
  trait: {
    VN: "Tiên Thiên",
    EN: "Trait",
    DE: "Merkmal",
  },
  guide: {
    VN: "Hướng Dẫn",
    EN: "Guide",
    DE: "Leitfaden",
  },
  character: {
    VN: "Nhân Vật",
    EN: "Character",
    DE: "Figuren",
  },
  login: {
    VN: "Đăng Nhập",
    EN: "Login",
    DE: "Anmelden",
  },
  destiny: {
    VN: "Nghịch Thiên",
    EN: "Destiny",
    DE: "Schicksal",
  },
  searchName: {
    VN: "Tìm Theo Tên",
    EN: "Search By Name",
    DE: "Mit Namen Suchen",
  },
  invalid: {
    VN: "Không Hợp Lệ",
    EN: "Invalid",
    DE: "Ungültig",
  },

  loginError: {
    VN: "Cần đăng nhập để sử dụng tính năng",
    EN: "Login is required to use the feature",
    DE: "Für die Nutzung der Funktion ist ein Login erforderlich",
  },
  thanksError: {
    VN: "Cảm ơn đã tải lên. File sẽ được kiểm tra tính hợp lệ",
    EN: "Thanks for uploading. The file will be checked for validity",
    DE: "Danke fürs hochladen. Die Datei wird auf ihre Gültigkeit überprüft",
  },
  fastError: {
    VN: "Máy chủ miễn phí nên xin hãy chậm lại",
    EN: "The server is free so please slow down",
    DE: "Der Server ist kostenlos, bitte verlangsamen Sie",
  },
  color: {
    color: {
      VN: "Màu Sắc",
      EN: "Color",
      DE: "Farbe",
    },
    red: {
      VN: "Đỏ",
      EN: "Red",
      DE: "Rot",
    },
    orange: {
      VN: "Cam",
      EN: "Orange",
      DE: "Orange",
    },
    purple: {
      VN: "Tím",
      EN: "Purple",
      DE: "Lila",
    },
    blue: {
      VN: "Lam",
      EN: "Blue",
      DE: "Blau",
    },
    green: {
      VN: "Lục",
      EN: "Green",
      DE: "Grün",
    },
    grey: {
      VN: "Xám",
      EN: "Grey",
      DE: "Grau",
    },
  },
  stat: {
    stat: {
      VN: "Chỉ Số",
      EN: "Stat",
      DE: "Stat",
    },
    attack: {
      VN: "Công Kích",
      EN: "Attack",
      DE: "Attacke",
    },
    defense: {
      VN: "Phòng Ngự",
      EN: "Defense",
      DE: "Verteildigung",
    },
    luck: {
      VN: "May Mắn",
      EN: "Luck",
      DE: "Glück",
    },
    int: {
      VN: "Ngộ Tính",
      EN: "Intelligent",
      DE: "Intelligent",
    },
    beauty: {
      VN: "Mị Lực",
      EN: "Beauty",
      DE: "Schönheit",
    },
    nature: {
      VN: "Tư Chất",
      EN: "Nature",
      DE: "Natur",
    },
    glory: {
      VN: "Danh Vọng",
      EN: "Glory",
      DE: "Ruhm",
    },
  },
  language: {
    VN: "Ngôn Ngữ",
    EN: "Language",
    DE: "Sprache",
  },
  option: {
    VN: "Lựa Chọn",
    EN: "Option",
    DE: "Option",
  },
  title: {
    VN: "Danh Hiệu",
    EN: "Title",
    DE: "Titel",
  },
  hat: {
    VN: "Mũ",
    EN: "Hat",
    DE: "Hut",
  },
  neckhair: {
    VN: "Tóc Gáy",
    EN: "Back Hair",
    DE: "Hinterkopfhaare",
  },
  eyebrow: {
    VN: "Lông Mày",
    EN: "Eyebrow",
    DE: "Augenbraue",
  },
  nose: {
    VN: "Mũi",
    EN: "Nose",
    DE: "Nase",
  },
  back: {
    VN: "Lưng",
    EN: "Back",
    DE: "Rücken",
  },
  beard: {
    VN: "Râu",
    EN: "Beard",
    DE: "Bart",
  },
  clothes: {
    VN: "Trang Phục",
    EN: "Clothes",
    DE: "Kleidung",
  },
  face: {
    VN: "Khuôn Mặt",
    EN: "Face",
    DE: "Gesicht",
  },
  mouth: {
    VN: "Miệng",
    EN: "Mouth",
    DE: "Mund",
  },
  eye: {
    VN: "Mắt",
    EN: "Eyes",
    DE: "Augen",
  },
  hair: {
    VN: "Tóc",
    EN: "Hair",
    DE: "Haare",
  },
  sum: {
    VN: "Tổng",
    EN: "Sum",
    DE: "Summe",
  },
  guideForm: {
    autor: {
      VN: "Tên Tác Giả",
      EN: "Autor",
      DE: "Autor",
    },
    name: {
      VN: "Tên Hướng Dẫn",
      EN: "Guide Name",
      DE: "Name des Leitfadens",
    },
    fileError: {
      VN: "Không phải file PDF",
      EN: "File is not a PDF data",
      DE: "Datei ist keine PDF-Daten",
    },
    missInfo: {
      VN: "Thiếu thông tin",
      EN: "Missing information",
      DE: "Fehlende Information",
    },
  },
};

# ExtinGard — Kurumsal Web Sitesi

Doğal bileşenlerden oluşan yangın söndürücü toz ExtinGard için hazırlanmış,
bağımlılığı olmayan statik web sitesi. Tüm içerik proje sunumlarından alınmıştır.

## Çalıştırma

`index.html` dosyasına çift tıklamanız yeterli — derleme adımı, paket kurulumu
veya sunucu gerekmez.

Yerel sunucu ile denemek isterseniz:

```
python -m http.server 8000
```

Ardından tarayıcıda `http://localhost:8000` adresini açın.

## Dosya yapısı

```
Web Sitesi/
├── index.html          Ana sayfa — problem, çözüm, bileşim, rekabet, pazar, yol haritası
├── teknoloji.html      Patentli formülasyon, üçlü mekanizma, tepkimeler, üretim protokolü
├── testler.html        Test yöntemi, 7 malzemelik sonuç tablosu, saha doğrulama, video kayıtları
├── patent.html         Marka tescili (Nice sınıfları), patent süreci ve inceleme raporu
├── hakkimizda.html     Ekip, misyon–vizyon, başarılar, kaynakça
├── iletisim.html       İletişim bilgileri, form ve SSS
└── assets/
    ├── css/style.css   Tüm tasarım sistemi (tokenlar + bileşenler), tek dosya
    ├── js/main.js      Menü, animasyonlar, sayaçlar, SSS, form — bağımlılık yok
    ├── img/logo.svg    Alev + yaprak logosu (aynı zamanda favicon)
    └── video/          test-01…04.mp4 — test kayıtları
```

## Bilinmesi gerekenler

**İletişim formu.** Sunucu tarafı olmadığı için form, doldurulan bilgilerle
e-posta uygulamanızı açar (`mailto:`). Gerçek bir form servisi isterseniz
`assets/js/main.js` içindeki `initContactForm` fonksiyonunu Formspree, Netlify
Forms veya kendi endpoint'inizle değiştirin.

**Video başlıkları.** `testler.html` içindeki dört kayıt "Test kaydı 01–04"
olarak genel şekilde adlandırılmıştır. Hangi malzemenin test edildiğini
biliyorsanız başlıkları güncellemeniz sunumu güçlendirir.

**Yazı tipleri.** Plus Jakarta Sans ve Inter, Google Fonts üzerinden yüklenir.
İnternet yoksa sistem yazı tiplerine düşer; düzen bozulmaz.

**Renk paleti.** Bileşim grafiğindeki yeşil ramp ve maliyet grafiğindeki
vurgu rengi, renk körlüğü ayrımı ve kontrast açısından doğrulanmıştır.
Renkleri değiştirirseniz `style.css` başındaki token bloğundan değiştirin.

## İçerik güncelleme

Sayısal veriler doğrudan HTML içinde yazılıdır. Sık güncellenecek yerler:

| Bilgi | Dosya |
|---|---|
| Patent / marka numaraları ve tarihleri | `patent.html`, tüm sayfaların alt bilgisi |
| Test sonuçları tablosu | `testler.html` |
| Birim maliyet ve rekabet tablosu | `index.html` |
| Yol haritası çeyrekleri | `index.html` |
| Ekip üyeleri | `hakkimizda.html` |
| İletişim bilgileri | Tüm sayfaların alt bilgisi + `iletisim.html` |

Alt bilgi ve üst menü her sayfada birebir aynıdır; birinde değişiklik
yaparsanız diğer beş sayfaya da uygulayın.

## Yayına alma

Statik site olduğu için klasörü olduğu gibi yükleyebilirsiniz:
GitHub Pages, Netlify, Vercel veya klasik bir paylaşımlı hosting.
Alan adı bağlandıktan sonra sayfalardaki `og:` etiketlerine tam URL
eklemeniz sosyal medya önizlemeleri için faydalı olur.

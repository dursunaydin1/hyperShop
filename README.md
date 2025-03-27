# HyperShop - Modern E-Ticaret Platformu

HyperShop, modern ve kullanıcı dostu bir e-ticaret platformudur. Koyu tema tasarımı ve responsive yapısıyla farklı cihazlarda sorunsuz çalışır.

## Özellikler

- 🎨 Modern ve şık koyu tema tasarımı
- 📱 Tam responsive tasarım (Mobil, Tablet, Laptop)
- 🔄 Sayfalama sistemi
- 🖼️ Ürün kartları
- 🔍 Filtreleme seçenekleri
- 🌐 Font Awesome ikonları

## Teknolojiler

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, Media Queries)
- JavaScript (ES6+)
- Font Awesome 6.5.1
- HyperTeknoloji API

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/kullaniciadi/hyperShop.git
```

2. Proje dizinine gidin:

```bash
cd hyperShop
```

3. `index.html` dosyasını bir web tarayıcısında açın.

## API Entegrasyonu

Proje, HyperTeknoloji API'sini kullanmaktadır. API token'ı `script.js` dosyasında tanımlanmıştır:

```javascript
const API_TOKEN = "your-api-token";
```

## Dosya Yapısı

```
hyperShop/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Özellikler Detayı

### Ürün Listesi

- Her sayfada 40 ürün gösterilir
- Ürünler grid yapısında düzenlenir
- Her ürün kartında:
  - Ürün görseli
  - Ürün adı
  - Satış fiyatı
  - Detay butonu

### Sayfalama

- Dinamik sayfa numaraları
- İleri/geri navigasyon butonları
- Aktif sayfa vurgusu
- Sayfa başına 40 ürün

### Responsive Tasarım

- 1200px: Büyük ekranlar
- 992px: Tablet
- 768px: Küçük tablet
- 576px: Mobil
- Yatay mod desteği

### Performans

- Lazy loading görsel yükleme
- Sayfa yükleme göstergesi
- Optimize edilmiş CSS
- Template kullanımı

## Tarayıcı Desteği

- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

- Website: [https://www.hyperteknoloji.com.tr](https://www.hyperteknoloji.com.tr)

## Demo

### Canlı Demo

Projeyi canlı olarak görüntüleyebilirsiniz: [HyperShop on Vercel](https://hyper-shop.vercel.app)

### Proje Görüntüsü

![HyperShop Demo](./screen.gif)

import AnimatedSection from '../components/ui/AnimatedSection'

export default function Privacy() {
  return (
    <>
      <section className="relative py-16 bg-dark overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Gizlilik Politikası & KVKK</h1>
            <p className="text-gray-400">Kişisel verilerin korunması hakkında bilgilendirme</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-gray max-w-none space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">1. Veri Sorumlusu</h2>
              <p className="text-gray-600 leading-relaxed">
                ISIMAK Enerji Sistemleri ("Şirket"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar doğrultusunda, hukuka ve dürüstlük kurallarına uygun olarak işlemektedir.
              </p>
              <div className="bg-gray-50 rounded-xl p-5 mt-4 text-sm text-gray-600 space-y-1">
                <p><strong>Firma:</strong> ISIMAK Enerji Sistemleri</p>
                <p><strong>Adres:</strong> Mecidiyeköy Mah. Mehmetçik Cd. No:8/B Şişli / İstanbul</p>
                <p><strong>E-posta:</strong> yusuf@isimakenerji.com</p>
                <p><strong>Telefon:</strong> (0212) 212 96 96</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">2. Toplanan Kişisel Veriler</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Web sitemiz üzerinden aşağıdaki kişisel veriler toplanabilmektedir:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>WhatsApp üzerinden iletişime geçtiğinizde paylaştığınız ad, soyad ve telefon numarası</li>
                <li>E-posta yoluyla iletişime geçtiğinizde paylaştığınız e-posta adresi ve mesaj içeriği</li>
                <li>Web sitesi ziyaret bilgileri (çerezler aracılığıyla toplanan anonim kullanım verileri)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">3. Verilerin İşlenme Amaçları</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Ürün ve hizmetlerimiz hakkında bilgi taleplerinin karşılanması</li>
                <li>Teklif ve fiyat bilgisi sunulması</li>
                <li>Müşteri ilişkilerinin yönetilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Web sitesi performansının iyileştirilmesi</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">4. Verilerin Aktarılması</h2>
              <p className="text-gray-600 leading-relaxed">
                Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmamaktadır. Web sitemizde kullanılan teknik altyapı hizmetleri (hosting, analitik) kapsamında veriler, yalnızca hizmetin sağlanması amacıyla ilgili hizmet sağlayıcılarla paylaşılabilir.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">5. Çerez Politikası</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Web sitemizde aşağıdaki türde çerezler kullanılmaktadır:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Zorunlu çerezler:</strong> Web sitesinin düzgün çalışması için gerekli olan teknik çerezler</li>
                <li><strong>Analitik çerezler:</strong> Ziyaretçi istatistiklerinin anonim olarak toplanması için kullanılan çerezler</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bu durumda web sitesinin bazı özellikleri düzgün çalışmayabilir.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">6. Haklarınız</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                KVKK'nın 11. maddesi gereğince aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Haklarınızı kullanmak için <a href="mailto:yusuf@isimakenerji.com" className="text-primary hover:underline">yusuf@isimakenerji.com</a> adresine başvurabilirsiniz.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">7. Güncelleme</h2>
              <p className="text-gray-600 leading-relaxed">
                Bu gizlilik politikası en son <strong>Nisan 2026</strong> tarihinde güncellenmiştir. Şirketimiz, bu politikayı herhangi bir zamanda güncelleme hakkını saklı tutar. Güncellemeler web sitesinde yayınlandığı tarihte yürürlüğe girer.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

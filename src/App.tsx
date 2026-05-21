import { useEffect, useState, useRef } from 'react';
import './index.css';

function App() {
  const [progress, setProgress] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(t > 0 ? (window.scrollY / t) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const rv = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />

      <header className="topbar">
        <div className="topbar-brand">Triết học Mác–Lênin</div>
        <ul className="topbar-nav">
          <li><a href="#p1">Bối cảnh</a></li>
          <li><a href="#p2">Cơ sở</a></li>
          <li><a href="#p4">Tất yếu</a></li>
          <li><a href="#p6">Phân kỳ</a></li>
          <li><a href="#p9">Đặc điểm</a></li>
          <li><a href="#p11">Tổng kết</a></li>
        </ul>
      </header>

      {/* ═══ HERO FOCUS ═══ */}
      <section className="page hero-focus" data-bg="MỞ ĐẦU" style={{ '--orb-x': '70%', '--orb-y': '30%' } as React.CSSProperties}>
        <p className="page-label">Chương 3 · Phần 1</p>
        <h1 className="page-title">
          Chủ Nghĩa Xã Hội: Giai Đoạn Đầu Của Hình Thái
          Kinh Tế–Xã Hội Cộng Sản Chủ Nghĩa
        </h1>
        <div className="hero-rule" />
        <p className="page-lead">
          Hệ thống hóa toàn diện cơ sở lý luận, tính tất yếu lịch sử
          và bản chất quy luật của thời kỳ quá độ
        </p>
        <p className="hero-meta">Bài thuyết trình Triết học Mác–Lênin</p>
        <div className="scroll-hint">Cuộn xuống</div>
      </section>

      {/* ═══ 3-COLUMN MATRIX — Mối liên hệ logic ═══ */}
      <section id="p1" className="page" data-bg="01" style={{ '--orb-x': '20%', '--orb-y': '70%', '--bg-x': '3%', '--bg-y': '5%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Mối liên hệ logic giữa các chương</h2>
          <p className="page-lead">
            Để hiểu rõ logic khoa học của Chương 3, chúng ta cần điểm nhanh qua
            mạch phát triển tư tưởng từ hai chương trước:
          </p>
        </div>
        <div ref={rv} className="rv matrix-3">
          <div className="matrix-cell">
            <small>Chương 1</small>
            <h3>Nhập môn CNXHKH</h3>
            <p>
              Xác định đối tượng, phương pháp nghiên cứu và
              <span className="amber"> vị trí lý luận </span>
              của CNXHKH trong cấu trúc toàn bộ học thuyết Mác–Lênin.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Chương 2</small>
            <h3>Sứ mệnh lịch sử của GCCN</h3>
            <p>
              Khẳng định <span className="amber">chủ thể thực hiện</span> bước chuyển
              đại nhảy vọt của lịch sử: Giai cấp công nhân là lực lượng xóa bỏ
              ách áp bức tư sản.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Chương 3 — Tiêu điểm</small>
            <h3>Hình thái xã hội mới</h3>
            <p>
              Đi sâu vào <span className="amber">tiến trình tất yếu</span> và các giai đoạn
              phát triển cụ thể của hình thái xã hội mới mà CNXH là nấc thang đầu tiên.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Cơ sở lý luận ═══ */}
      <section id="p2" className="page" data-bg="02" style={{ '--orb-x': '80%', '--orb-y': '25%', '--bg-x': '8%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Cơ sở lý luận của Học thuyết Hình thái Kinh tế–Xã hội</h2>
            <p className="page-lead">
              C. Mác và Ph. Ăngghen đã xây dựng nên học thuyết vĩ đại về
              Hình thái kinh tế–xã hội khi mổ xẻ cấu trúc
              <span className="amber"> lịch sử xã hội tư bản</span>.
            </p>
          </div>
          <figure className="header-img">
            <img src="/images/marx-engels.png" alt="C. Mác và Ph. Ăngghen" />
            <figcaption>C. Mác và Ph. Ăngghen</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Hai đóng góp lớn</h3>
            <ul className="bullet-list">
              <li>
                Vạch rõ những <strong>quy luật cơ bản</strong> của sự vận động xã hội.
              </li>
              <li>
                Chỉ ra <strong>phương pháp khoa học</strong> cốt lõi để giải thích bản chất
                lịch sử loài người một cách khách quan, duy vật thay vì duy tâm.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Góc nhìn động lực học xã hội</h3>
            <ul className="bullet-list">
              <li>
                Không chỉ làm rõ các yếu tố cấu thành tĩnh
                (Lực lượng sản xuất, Quan hệ sản xuất, Kiến trúc thượng tầng).
              </li>
              <li>
                Quan trọng hơn: xem xét xã hội trong quá trình
                <strong> biến đổi và phát triển không ngừng</strong>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 3-COLUMN MATRIX — Lênin ═══ */}
      <section className="page" data-bg="03" style={{ '--orb-x': '15%', '--orb-y': '40%', '--bg-x': '2%', '--bg-y': '15%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Sự phát triển lý luận và hiện thực hóa của V.I. Lênin</h2>
            <p className="page-lead">
              Từ nền tảng lý luận thuần túy của thế kỷ XIX, học thuyết đã trải qua
              bước ngoặt lịch sử quan trọng bước vào thế kỷ XX.
            </p>
          </div>
          <figure className="header-img">
            <img src="/images/lenin.png" alt="V.I. Lênin" />
            <figcaption>V.I. Lênin (1870–1924)</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv matrix-3">
          <div className="matrix-cell">
            <small>Đóng góp 1</small>
            <h3>Bổ sung mang tính thời đại</h3>
            <p>
              Lênin tiếp thu tinh thần Mác–Ăngghen, bổ sung đặc điểm của
              <span className="amber"> chủ nghĩa tư bản giai đoạn độc quyền</span>
              (Chủ nghĩa đế quốc) vào học thuyết.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Đóng góp 2</small>
            <h3>Hiện thực hóa sinh động</h3>
            <p>
              Đưa lý luận vào đời sống thông qua lãnh đạo thực tiễn xây dựng CNXH
              ở <span className="amber">nước Nga Xôviết</span> sau
              Cách mạng Tháng Mười.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Đóng góp 3</small>
            <h3>Tài sản vô giá của nhân loại</h3>
            <p>
              Tạo nên Học thuyết HTKT-XH hoàn chỉnh, cung cấp cho giai cấp
              công nhân toàn cầu <span className="amber">tiêu chuẩn thực sự duy vật,
              khoa học</span> để phân kỳ lịch sử.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Tính tất yếu ═══ */}
      <section id="p4" className="page" data-bg="04" style={{ '--orb-x': '75%', '--orb-y': '65%', '--bg-x': '5%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Tính tất yếu mang tính Quy luật Lịch sử–Tự nhiên</h2>
        </div>
        <div ref={rv} className="rv quote">
          <blockquote>
            Học thuyết HTKT-XH của chủ nghĩa Mác–Lênin đã chỉ ra tính tất yếu
            của sự thay thế HTKT-XH tư bản chủ nghĩa bằng HTKT-XH cộng sản chủ nghĩa.
            Đó là một <span className="amber">quá trình lịch sử–tự nhiên</span>.
          </blockquote>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Thế nào là "Quá trình lịch sử–tự nhiên"?</h3>
            <ul className="bullet-list">
              <li>
                Sự sụp đổ của phương thức sản xuất tư bản diễn ra
                hoàn toàn <strong>khách quan</strong>.
              </li>
              <li>
                Tiến trình tuân theo quy luật vận động nội tại của xã hội,
                tựa như quy luật trong giới tự nhiên, không phụ thuộc vào
                ý muốn chủ quan hay mệnh lệnh của bất kỳ cá nhân nào.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Phương thức dịch chuyển xã hội</h3>
            <ul className="bullet-list">
              <li>
                Sự thay thế này không diễn ra tự động, hòa bình hay tự phát.
              </li>
              <li>
                Bắt buộc phải <strong>thực hiện thông qua Cách mạng XHCN</strong>
                — cuộc cải biến toàn diện nhằm lật đổ giai cấp thống trị cũ.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Hai tiền đề ═══ */}
      <section className="page" data-bg="05" style={{ '--orb-x': '25%', '--orb-y': '30%', '--bg-x': '10%', '--bg-y': '8%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Hai tiền đề vật chất quyết định sự ra đời của HTKT-XH mới</h2>
          <p className="page-lead">
            Cuộc cách mạng XHCN chỉ có thể bùng nổ khi xã hội tích lũy đủ
            <span className="amber"> hai tiền đề vật chất</span> phát sinh từ trong lòng
            xã hội tư bản cũ:
          </p>
          <figure className="illus">
            <img src="/images/factory-workers.png" alt="Nền đại công nghiệp và giai cấp công nhân" />
            <figcaption>Nền đại công nghiệp TBCN — nơi thai nghén hai tiền đề cách mạng</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Tiền đề 1: Lực lượng sản xuất</h3>
            <ul className="bullet-list">
              <li>
                Nền đại công nghiệp TBCN thúc đẩy LLSX phát triển đạt tới mức
                <strong> xã hội hóa cao độ</strong>.
              </li>
              <li>
                Bản chất xã hội hóa này xung đột gay gắt với QHSX dựa trên
                chế độ chiếm hữu tư nhân TBCN.
              </li>
              <li>
                Mâu thuẫn đòi hỏi phá vỡ xiềng xích QHSX tư sản để
                giải phóng hoàn toàn năng lực sản xuất.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Tiền đề 2: Giai cấp công nhân</h3>
            <ul className="bullet-list">
              <li>
                Kinh tế tư bản đồng thời tạo ra và rèn luyện giai cấp công nhân.
              </li>
              <li>
                Trưởng thành vượt bậc về <strong>ý thức chính trị,
                tính tổ chức, tinh thần kỷ luật</strong>.
              </li>
              <li>
                Được vũ trang bằng lý luận Mác–Lênin → lực lượng chính trị độc lập,
                tự giác gánh vác sứ mệnh: <span className="amber">Đào huyệt chôn vùi CNTB</span>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ LINEAR TIMELINE — Phân kỳ ═══ */}
      <section id="p6" className="page" data-bg="06" style={{ '--orb-x': '85%', '--orb-y': '50%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Lý luận phân kỳ Hình thái Kinh tế–Xã hội Cộng sản Chủ nghĩa</h2>
          <p className="page-lead">
            Không xuất hiện hoàn hảo ngay lập tức — tiến hóa tuần tự
            <span className="amber"> từ thấp lên cao</span> qua hai giai đoạn:
          </p>
        </div>
        <div ref={rv} className="rv timeline">
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Xã hội cũ: Tư bản Chủ nghĩa</h3>
            <p>Điểm xuất phát — xã hội dựa trên chế độ tư hữu.</p>
          </div>
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Thời kỳ quá độ</h3>
            <p>Giai đoạn trung gian, cải biến cách mạng sâu sắc.
              Nằm đan xen giữa xã hội TBCN và xã hội CSCN.</p>
          </div>
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Giai đoạn thấp: Chủ nghĩa xã hội</h3>
            <p>Xã hội mới hình thành, còn mang "dấu vết" xã hội cũ.</p>
          </div>
          <div className="tl-node">
            <div className="tl-dot" />
            <h3>Giai đoạn cao: Chủ nghĩa cộng sản</h3>
            <p>Phát triển hoàn chỉnh trên cơ sở của chính nó.
              Nguyên tắc tối cao: <span className="amber">"Làm theo năng lực, hưởng theo nhu cầu"</span>.</p>
          </div>
        </div>
        <figure ref={rv} className="rv illus">
          <img src="/images/october-rev.png" alt="Cách mạng Tháng Mười Nga 1917" />
          <figcaption>Cách mạng Tháng Mười 1917 — bước ngoặt hiện thực hóa lý luận phân kỳ</figcaption>
        </figure>
      </section>

      {/* ═══ SPLIT 50/50 — Luận điểm Mác ═══ */}
      <section className="page" data-bg="07" style={{ '--orb-x': '30%', '--orb-y': '75%', '--bg-x': '4%', '--bg-y': '12%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Luận điểm kinh điển của C. Mác trong "Phê phán cương lĩnh Gôta"</h2>
          </div>
          <figure className="header-img">
            <img src="/images/gotha.png" alt="Phê phán cương lĩnh Gôta (1875)" />
            <figcaption>"Phê phán cương lĩnh Gôta" (1875)</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv quote">
          <blockquote>
            "Giữa xã hội tư bản chủ nghĩa và xã hội cộng sản chủ nghĩa là một
            thời kỳ cải biến cách mạng từ xã hội nọ sang xã hội kia. Thích ứng với
            thời kỳ ấy là một thời kỳ quá độ chính trị, và nhà nước của thời kỳ ấy
            không thể là cái gì khác hơn là
            <span className="amber"> nền chuyên chính cách mạng của giai cấp vô sản</span>."
          </blockquote>
          <cite>— C. Mác và Ph. Ăngghen: Toàn tập, t.19, tr.47.</cite>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Về bản chất thời kỳ</h3>
            <ul className="bullet-list">
              <li>
                Quá độ không phải trạng thái tĩnh tại — là
                <strong> thời kỳ cải biến cách mạng</strong> sâu sắc, toàn diện
                nhằm xóa bỏ gốc rễ xã hội cũ, gieo mầm xã hội mới.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Về bản chất nhà nước</h3>
            <ul className="bullet-list">
              <li>
                Nền <strong>chuyên chính cách mạng của giai cấp vô sản</strong>:
                đập tan sự phản kháng của giai cấp bóc lột cũ + tổ chức quần chúng
                xây dựng kinh tế–xã hội mới.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ HERO FOCUS — Lênin khẳng định ═══ */}
      <section className="page hero-focus" data-bg="08" style={{ '--orb-x': '50%', '--orb-y': '40%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">
            Sự khẳng định mang tính nguyên tắc của V.I. Lênin
          </h2>
        </div>
        <div ref={rv} className="rv quote" style={{ textAlign: 'left' }}>
          <blockquote>
            "Về lý luận, không thể nghi ngờ gì được rằng giữa chủ nghĩa tư bản
            và chủ nghĩa cộng sản, có một
            <span className="amber"> thời kỳ quá độ nhất định</span>."
          </blockquote>
          <cite>— V.I. Lênin: Toàn tập, t.39, tr.309.</cite>
        </div>
        <div ref={rv} className="rv" style={{ maxWidth: 640, textAlign: 'left' }}>
          <ul className="bullet-list">
            <li>
              <strong>Loại bỏ tư tưởng tả khuynh</strong> — Chống lại tư tưởng nóng vội,
              đòi "đốt cháy giai đoạn", bỏ qua các bước đi trung gian.
            </li>
            <li>
              <strong>Tính tất yếu quy luật</strong> — Cụm từ
              <span className="amber"> "nhất định"</span> khẳng định thời kỳ quá độ là
              quy luật khách quan, bắt buộc với mọi quốc gia, bất kể điểm xuất phát.
            </li>
          </ul>
        </div>
      </section>

      {/* ═══ 3-COLUMN MATRIX — Bản chất & Đặc điểm ═══ */}
      <section id="p9" className="page" data-bg="09" style={{ '--orb-x': '70%', '--orb-y': '20%', '--bg-x': '6%' } as React.CSSProperties}>
        <div ref={rv} className="rv header-with-img">
          <div className="header-text">
            <h2 className="page-title">Bản chất và Đặc điểm xã hội của Thời kỳ quá độ</h2>
          </div>
          <figure className="header-img">
            <img src="/images/transition-society.png" alt="Giao thoa giữa xã hội cũ và mới" />
            <figcaption>Xã hội quá độ — giao thoa cũ và mới</figcaption>
          </figure>
        </div>
        <div ref={rv} className="rv quote">
          <blockquote>
            "…một xã hội cộng sản chủ nghĩa vừa thoát thai từ xã hội tư bản chủ nghĩa,
            do đó về mọi phương diện — kinh tế, đạo đức, tinh thần — còn mang
            <span className="amber"> những dấu vết của xã hội cũ</span> mà nó đã lọt lòng ra."
          </blockquote>
          <cite>— C. Mác và Ph. Ăngghen: Toàn tập, t.19, tr.47.</cite>
        </div>
        <div ref={rv} className="rv matrix-3">
          <div className="matrix-cell">
            <small>Phương diện 1</small>
            <h3>Kinh tế</h3>
            <p>
              Tồn tại cơ cấu kinh tế nhiều thành phần; đan xen phức tạp giữa
              nhân tố XHCN mới đang hình thành và thành phần tư sản, tư nhân cũ.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Phương diện 2</small>
            <h3>Đạo đức</h3>
            <p>
              Còn tồn tại tư tưởng cá nhân chủ nghĩa, thói quen ích kỷ,
              lối sống thực dụng và tư duy coi khinh lao động chân tay.
            </p>
          </div>
          <div className="matrix-cell">
            <small>Phương diện 3</small>
            <h3>Tinh thần</h3>
            <p>
              Đấu tranh gay gắt giữa hệ tư tưởng cách mạng tiên tiến với
              tàn dư tâm lý, hủ tục phong kiến và tư sản chưa được quét sạch.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SPLIT 50/50 — Hai ý nghĩa ═══ */}
      <section className="page" data-bg="10" style={{ '--orb-x': '20%', '--orb-y': '55%', '--bg-x': '8%', '--bg-y': '6%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Hai ý nghĩa lý luận và thực tiễn về Thời kỳ quá độ</h2>
          <p className="page-lead">
            Từ sự đúc kết của C. Mác và thực tiễn của V.I. Lênin tại nước Nga Xôviết,
            thời kỳ quá độ được hiểu theo <span className="amber">hai nghĩa</span>:
          </p>
        </div>
        <div ref={rv} className="rv split">
          <div className="split-panel">
            <h3>Nghĩa 1: Nước chưa trải qua TBCN phát triển cao</h3>
            <ul className="bullet-list">
              <li>
                <strong>Lênin:</strong> "cần phải có một thời kỳ quá độ
                <span className="amber"> khá lâu dài</span> từ CNTB lên CNXH".
              </li>
              <li>
                Phương thức quá độ <strong>gián tiếp</strong>, vô cùng gian khổ, phức tạp.
              </li>
              <li>
                <strong>"Những cơn đau đẻ kéo dài"</strong> — Nhiệm vụ kép:
                vừa trấn áp giai cấp, vừa tự xây dựng toàn bộ cơ sở vật chất–kỹ thuật.
              </li>
            </ul>
          </div>
          <div className="split-panel">
            <h3>Nghĩa 2: Nước đã trải qua TBCN phát triển cao</h3>
            <ul className="bullet-list">
              <li>
                Vẫn <strong>bắt buộc trải qua thời kỳ quá độ nhất định</strong>,
                dù đã có nền tảng LLSX đại công nghiệp hiện đại.
              </li>
              <li>
                Cần thời gian cải biến toàn diện: QHSX tư hữu → công hữu,
                thiết lập hệ tư tưởng mới, xây dựng nguyên tắc phân phối XHCN.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ Tổng kết ═══ */}
      <section id="p11" className="page" data-bg="11" style={{ '--orb-x': '65%', '--orb-y': '35%', '--bg-x': '3%' } as React.CSSProperties}>
        <div ref={rv} className="rv">
          <h2 className="page-title">Tổng kết — 3 từ khóa chiến lược</h2>
          <p className="page-lead">
            Khi trình bày trước hội đồng và giảng viên,
            nhóm thuyết trình cần làm nổi bật:
          </p>
        </div>
        <div ref={rv} className="rv summary-strip">
          <div className="summary-row">
            <div className="summary-num">1</div>
            <div>
              <h3>Tất yếu khách quan</h3>
              <p>
                Sự chuyển biến lên CNXH không phải ý muốn chính trị nhất thời,
                mà là <span className="amber">quá trình lịch sử–tự nhiên</span>,
                được thúc đẩy bởi mâu thuẫn vật chất nội tại không thể điều hòa.
              </p>
            </div>
          </div>
          <div className="summary-row">
            <div className="summary-num">2</div>
            <div>
              <h3>Biến đổi toàn diện & đan xen</h3>
              <p>
                Thời kỳ quá độ mang tính giao thoa — đấu tranh gay gắt giữa cái mới
                vừa thoát thai và cái cũ trên mọi lĩnh vực:
                <span className="amber"> Kinh tế, Đạo đức, Tinh thần</span>.
              </p>
            </div>
          </div>
          <div className="summary-row">
            <div className="summary-num">3</div>
            <div>
              <h3>Tính đa dạng thực tiễn</h3>
              <p>
                Dài hay ngắn, trực tiếp hay gián tiếp — phụ thuộc vào điểm xuất phát
                của LLSX mỗi quốc gia. Với nước lạc hậu, tất yếu là
                <span className="amber"> "những cơn đau đẻ kéo dài"</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

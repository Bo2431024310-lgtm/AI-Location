"use client";

import { FormEvent, useMemo, useState } from "react";

type Product = { id: number; name: string; detail: string; aisle: string; shelf: string; zone: string; stock: string; emoji: string; tags: string[] };

const products: Product[] = [
  { id: 1, name: "นมสดเมจิ รสจืด 2 ลิตร", detail: "แพ็ก 2 ขวด • แช่เย็น", aisle: "12", shelf: "B3", zone: "โซนแช่เย็น", stock: "มีสินค้า", emoji: "🥛", tags: ["นม", "เมจิ", "นมสด"] },
  { id: 2, name: "ข้าวหอมมะลิ ตราฉัตร 5 กก.", detail: "ถุง 5 กิโลกรัม", aisle: "05", shelf: "A2", zone: "อาหารแห้ง", stock: "เหลือ 8 ชิ้น", emoji: "🍚", tags: ["ข้าว", "ข้าวสาร", "ฉัตร"] },
  { id: 3, name: "น้ำมันพืชมรกต 1 ลิตร", detail: "แพ็ก 3 ขวด", aisle: "07", shelf: "C1", zone: "เครื่องปรุง", stock: "มีสินค้า", emoji: "🫙", tags: ["น้ำมัน", "มรกต", "เครื่องปรุง"] },
  { id: 4, name: "ไข่ไก่สด เบอร์ 2", detail: "แพ็ก 30 ฟอง", aisle: "10", shelf: "A1", zone: "อาหารสด", stock: "มีสินค้า", emoji: "🥚", tags: ["ไข่", "ไข่ไก่", "อาหารสด"] },
];

const categories = [["🥬", "อาหารสด"], ["🥫", "ของแห้ง"], ["🧊", "แช่เย็น"], ["🧴", "ของใช้"], ["🥤", "เครื่องดื่ม"]];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(products[0]);
  const results = useMemo(() => {
    const term = activeQuery.trim().toLowerCase();
    if (!term) return products;
    return products.filter((item) => [item.name, item.detail, item.zone, ...item.tags].join(" ").toLowerCase().includes(term));
  }, [activeQuery]);
  function submitSearch(event: FormEvent) {
    event.preventDefault();
    setActiveQuery(query);
    const found = products.find((item) => [item.name, ...item.tags].join(" ").includes(query.trim()));
    if (found) setSelected(found);
  }
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Makro AI Item Location"><span>makro</span><small>AI ITEM LOCATION</small></a>
        <button className="branch"><span>●</span><span><small>สาขาของคุณ</small>ศรีนครินทร์⌄</span></button>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy"><span className="eyebrow">ผู้ช่วยช้อปอัจฉริยะ</span><h1>หาเจอไว<br /><em>ช้อปได้ทันที</em></h1><p>บอกชื่อสินค้า หรือหมวดหมู่ที่ต้องการ<br />เราจะพาคุณไปถึงชั้นวางที่ถูกต้อง</p></div>
        <form className="search-card" onSubmit={submitSearch}>
          <label htmlFor="product-search">วันนี้กำลังมองหาอะไร?</label>
          <div className="search-box"><span aria-hidden="true">⌕</span><input id="product-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="เช่น นมสด, ข้าวหอมมะลิ..." autoComplete="off" /><button type="button" className="mic" aria-label="ค้นหาด้วยเสียง">●</button><button type="submit">ค้นหา</button></div>
          <div className="quick-tags"><span>ค้นหายอดนิยม</span>{["นมสด", "ข้าวสาร", "น้ำมันพืช"].map((tag) => <button key={tag} type="button" onClick={() => { setQuery(tag); setActiveQuery(tag); }}>{tag}</button>)}</div>
        </form>
      </section>
      <section className="content-wrap">
        <div className="categories" aria-label="หมวดหมู่สินค้า">{categories.map(([icon, name]) => <button key={name} onClick={() => { setQuery(name); setActiveQuery(name); }}><span>{icon}</span>{name}</button>)}</div>
        <div className="section-head"><div><span className="kicker">ผลการค้นหา</span><h2>{activeQuery ? `“${activeQuery}”` : "สินค้าแนะนำ"}</h2></div><span>{results.length} รายการ</span></div>
        <div className="shop-grid">
          <div className="results-list">
            {results.length ? results.map((item) => <button className={`product-card ${selected?.id === item.id ? "active" : ""}`} key={item.id} onClick={() => setSelected(item)}><span className="product-art">{item.emoji}</span><span className="product-info"><strong>{item.name}</strong><small>{item.detail}</small><span className="stock">● {item.stock}</span></span><span className="location"><small>ทางเดิน</small><b>{item.aisle}</b><em>ชั้น {item.shelf}</em></span></button>) : <div className="empty"><span>⌕</span><h3>ยังไม่พบสินค้าที่ค้นหา</h3><p>ลองใช้ชื่อที่สั้นลง หรือเลือกจากหมวดหมู่ด้านบน</p></div>}
          </div>
          <aside className="map-card">
            <div className="map-top"><span><small>ตำแหน่งสินค้า</small><strong>{selected?.zone ?? "เลือกสินค้า"}</strong></span><span className="live-dot">● อัปเดตล่าสุด</span></div>
            <div className="store-map" aria-label="แผนผังตำแหน่งสินค้า"><span className="entrance">ทางเข้า</span>{["01","02","03","04","05","06","07","08","09","10","11","12"].map((aisle) => <div key={aisle} className={`aisle a${aisle} ${selected?.aisle === aisle ? "target" : ""}`}><span>{aisle}</span></div>)}{selected && <div className={`pin p${selected.aisle}`}><span>●</span><small>{selected.name.split(" ")[0]}</small></div>}<div className="you">คุณอยู่ที่นี่</div><div className="route-line" /></div>
            <div className="map-bottom"><div><small>เดินประมาณ</small><strong>2 นาที <span>• 80 เมตร</span></strong></div><button onClick={() => document.querySelector(".store-map")?.scrollIntoView({ behavior: "smooth", block: "center" })}>เริ่มนำทาง <span>→</span></button></div>
          </aside>
        </div>
      </section>
      <footer><span><b>makro</b> AI Item Location</span><span>ข้อมูลตำแหน่งสินค้าเป็นข้อมูลตัวอย่าง</span></footer>
    </main>
  );
}


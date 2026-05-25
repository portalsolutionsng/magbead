const testimonials = [
  {
    quote: "Best quality beads in Lagos. They look even better in person!",
    name: "Titi",
    location: "V.I.",
  },
  {
    quote: "The custom name is so neat. I'm ordering for my sisters too.",
    name: "Sarah",
    location: "Lekki",
  },
];

export default function Testimonials() {
  return (
    <section style={{ backgroundColor: '#0A0A0F', padding: '72px 16px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>

        {/* Label */}
        <p style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#D4A843',
          margin: '0 0 10px',
        }}>
          Happy Customers
        </p>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontWeight: 700,
          fontSize: '32px',
          color: '#F5F0E8',
          lineHeight: 1.1,
          margin: '0 0 40px',
        }}>
          What They Say
        </h2>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                backgroundColor: '#12121A',
                border: '1px solid #2A2A3A',
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'left',
              }}
            >
              {/* Stars */}
              <div style={{
                color: '#D4A843',
                fontSize: '15px',
                letterSpacing: '2px',
                marginBottom: '12px',
              }}>
                ★★★★★
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '15px',
                color: '#F5F0E8',
                lineHeight: 1.7,
                fontStyle: 'italic',
                margin: '0 0 16px',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <p style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '13px',
                color: '#D4A843',
                fontWeight: 600,
                margin: 0,
              }}>
                — {t.name}, {t.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Degradés y símbolos que usan los stickers, los íconos y las ilustraciones (van una sola vez en la página)
const BARRA = (fill) => [0, 45, 90, 135].map((g) => <rect key={g} x="10.3" y="1.5" width="3.4" height="21" rx="1.7" transform={`rotate(${g} 12 12)`} fill={fill} />);

export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="holo" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(0 .5 .5)">
          <stop offset="0" stopColor="#ffc4ea" /><stop offset=".18" stopColor="#bfeeff" /><stop offset=".36" stopColor="#fff3a6" />
          <stop offset=".54" stopColor="#ffbfe3" /><stop offset=".72" stopColor="#c3d1ff" /><stop offset=".88" stopColor="#bfffee" /><stop offset="1" stopColor="#ffc4ea" />
        </linearGradient>
        <linearGradient id="foto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFD9EB" /><stop offset="1" stopColor="#FF8CC6" /></linearGradient>
        <path id="aro" d="M90,90 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
      </defs>
      <symbol id="ast" viewBox="0 0 24 24">{BARRA('#E4007C')}</symbol>
      <symbol id="astB" viewBox="0 0 24 24">{BARRA('#fff')}</symbol>
      <symbol id="wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" /></symbol>
      <symbol id="bolsa" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" /></symbol>
    </svg>
  );
}

export const Icono = ({ id, ...props }) => <svg aria-hidden="true" {...props}><use href={'#' + id} /></svg>;

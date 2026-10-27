// Logo tipográfico (versión dibujada del logo del Instagram). xl = versión grande del sticker de transición y de /links
export default function Logo({ xl = false, ...props }) {
  return (
    <span className={'logo' + (xl ? ' xl' : '')} {...props}>
      <span className="logo-a">A TODA</span>
      <span className="logo-imp">impresión</span>
      <span className="logo-dg">DISEÑO GRÁFICO</span>
    </span>
  );
}

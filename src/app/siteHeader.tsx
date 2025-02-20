import logo from "/stackline_logo.svg";

export default function SiteHeader() {
  return (
    <nav className="bg-indigo-950">
      <div className="flex flex-wrap items-start justify-between p-4">
        <img src={logo} className="flexs h-7" alt="Stackline Logo" />
      </div>
    </nav>
  );
}

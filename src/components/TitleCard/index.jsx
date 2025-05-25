function TitleCard({
  title,
  children,
  styleClass = "",
  leftBtn,
  titleBtn,
  handleBtn,
}) {
  return (
    <div className={`card  w-full p-6 bg-base-100 shadow-xl ${styleClass}`}>
      <div className="flex justify-between items-center">
        <div className={`text-xl font-semibold `}> {title}</div>
        {leftBtn && (
          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={handleBtn}>
              {titleBtn}
            </button>
          </div>
        )}
      </div>
      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full pb-6 bg-base-100">{children}</div>
    </div>
  );
}

export default TitleCard;

export default function StatCard({ title, value }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="text-muted">{title}</h6>
          <h5>{value}</h5>
        </div>
      </div>
    </div>
  );
}
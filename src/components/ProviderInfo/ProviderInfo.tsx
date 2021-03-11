import { NationalProvider } from "../../@types/NationalProvider";

interface ProviderInfoRowProps {
  label: string;
  value: string;
  title?: string;
}

const styles = {
  row: {
    display: "flex",
  }
};

const ProviderInfoRow = ({ label, value, title }: ProviderInfoRowProps) => {
  if (!value) {
    return null;
  }

  return (
    <div style={styles.row} title={title}>
      <div>{label}</div>
      <div>:</div>
      <div>{value}</div>
    </div>
  );
};

interface ProviderInfoProps {
  data: NationalProvider;
}

const ProviderInfo = ({ data }: ProviderInfoProps) => {
  const fullName = [data.name.last, data.name.middle, data.name.first]
    .filter((_) => !!_)
    .join(" ");

  const fullMailingAddress = [
    data.addr_mailing.line1,
    data.addr_mailing.line2,
    data.addr_mailing.city,
    data.addr_mailing.state,
    data.addr_mailing.zip,
    data.addr_practice.country,
  ]
    .filter((_) => !!_)
    .join(", ");
  const fullPracticeAddress = [
    data.addr_practice.line1,
    data.addr_practice.line2,
    data.addr_practice.city,
    data.addr_practice.state,
    data.addr_practice.zip,
    data.addr_practice.country,
  ]
    .filter((_) => !!_)
    .join(", ");
  return (
    <div className="provider-details card">
      <h5 className="card-header">{fullName}</h5>
      <div className="card-body">
        <ProviderInfoRow label="Provider Type" value={data.provider_type} />
        <ProviderInfoRow label="Gender" value={data.gender} />
        <ProviderInfoRow label="Full name" value={data.name.full} />
        {data.name_other ? (
          <div>
            <h6>Other name</h6>
            <ProviderInfoRow
              label="Full name"
              value={
                data.name_other.full ||
                [
                  data.name_other.last,
                  data.name_other.middle,
                  data.name_other.first,
                ]
                  .filter((_) => !!_)
                  .join(" ")
              }
            />
          </div>
        ) : null}
        <ProviderInfoRow
          label="Enumeration date"
          value={data.misc.enumeration_date}
        />
        <ProviderInfoRow
          label="Updated date"
          value={data.misc.last_update_date}
        />
        <ProviderInfoRow
          label="Is sole proprietor"
          value={data.misc.is_sole_proprietor}
        />
        {data.addr_mailing ? (
          <div className="container">
            <h6>Mailing</h6>
            <ProviderInfoRow label="Address" value={fullMailingAddress} />
            <ProviderInfoRow label="Phone" value={data.addr_mailing.phone} />
            <ProviderInfoRow label="Fax" value={data.addr_mailing.fax} />
          </div>
        ) : null}
        {data.addr_practice ? (
          <div className="container">
            <h6>Practice</h6>
            <ProviderInfoRow label="Address" value={fullPracticeAddress} />
            <ProviderInfoRow label="Phone" value={data.addr_practice.phone} />
            <ProviderInfoRow label="Fax" value={data.addr_practice.fax} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProviderInfo;

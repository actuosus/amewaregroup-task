import { NationalProvider } from "../../@types/NationalProvider";
import Map from "../Map";

interface ProviderInfoRowProps {
  label: string;
  value?: string;
  title?: string;
}

const styles = {
  row: {
    display: "flex",
  },
  avatar: {
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "lightgray",
  },
  avatarFemale: {
    backgroundColor: "lightpink",
  },
  avatarMale: {
    backgroundColor: "lightblue",
  },
  avatarIcon: {
    fontSize: 36,
  },
};

const ProviderInfoRow = ({ label, value, title }: ProviderInfoRowProps) => {
  if (!value) {
    return null;
  }

  return (
    <div className="card-text" style={styles.row} title={title}>
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

  const authOfficialFullName = data.misc.auth_official
    ? [data.name.last, data.name.middle, data.name.first]
        .filter((_) => !!_)
        .join(" ")
    : "";

  return (
    <div>
      <div className="provider-details card">
        <h5 className="card-header">
          {fullName}
        </h5>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div
                  className="rounded-circle"
                  style={{
                    ...styles.avatar,
                    ...(data.gender === "F"
                      ? styles.avatarFemale
                      : styles.avatarMale),
                  }}
                >
                  {/* <ProviderInfoRow label="Gender" value={data.gender} /> */}
                  {data.gender === "F" ? (
                    <i className="fas fa-female" style={styles.avatarIcon} />
                  ) : (
                    <i className="fas fa-male" style={styles.avatarIcon} />
                  )}
                </div>
              </div>
              <div className="col-sm">
                <ProviderInfoRow
                  label="Provider Type"
                  value={data.provider_type}
                />
              </div>
            </div>
          </div>
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
            label="Is sole proprietor"
            value={data.misc.is_sole_proprietor}
          />

          {data.licenses ? (
            <div className="container">
              <h6>License</h6>
              <ProviderInfoRow
                label="Number"
                value={data.licenses.lic_number}
              />
              <ProviderInfoRow label="State" value={data.licenses.lic_state} />
            </div>
          ) : null}

          {data.addr_practice ? (
            <div className="container">
              <h6>Practice</h6>
              <div className="row">
                <div className="col-sm">
                  <Map />
                </div>
                <div className="col-sm">
                  <ProviderInfoRow
                    label="Address"
                    value={fullPracticeAddress}
                  />
                </div>
              </div>

              <ProviderInfoRow label="Phone" value={data.addr_practice.phone} />
              <ProviderInfoRow label="Fax" value={data.addr_practice.fax} />
            </div>
          ) : null}

          {data.addr_mailing ? (
            <div className="container">
              <h6>Mailing</h6>
              <ProviderInfoRow label="Address" value={fullMailingAddress} />
              <ProviderInfoRow label="Phone" value={data.addr_mailing.phone} />
              <ProviderInfoRow label="Fax" value={data.addr_mailing.fax} />
            </div>
          ) : null}

          <ProviderInfoRow label="Auth official" value={authOfficialFullName} />
          <ProviderInfoRow
            label="Replacement NPI"
            value={data.misc.replacement_NPI}
          />
          <ProviderInfoRow label="EIN" value={data.misc.EIN} />
          <ProviderInfoRow
            label="Subpart of organization"
            value={data.misc.is_org_subpart}
          />
          <ProviderInfoRow label="Parent LBN" value={data.misc.parent_LBN} />
          <ProviderInfoRow label="Parent TIN" value={data.misc.parent_TIN} />
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-sm">
              <ProviderInfoRow
                label="Enumeration date"
                value={data.misc.enumeration_date}
              />
            </div>
            <div className="col-sm">
              <ProviderInfoRow
                label="Updated date"
                value={data.misc.last_update_date}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderInfo;

/**returns obfuscated email*/
const hideEmail = (email) => {
    const visible = 3;
    const separator = email.indexOf("@");
    const start = email.slice(visible, separator);

    if (!start.length) return email;
    const hidden = start.replace(/./g, "*");
    return email.slice(0, visible) + hidden + email.slice(separator);
};

export default hideEmail;


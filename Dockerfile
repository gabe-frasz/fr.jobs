FROM oven/bun:latest

# Install latest chrome dev package and fonts to support major charsets
# Note: this installs the necessary libs to make the bundled version of Chrome that Puppeteer
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
  && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] https://dl-ssl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11 \
  --no-install-recommends \
  && service dbus start \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /home/app

ENV DBUS_SESSION_BUS_ADDRESS autolaunch:

COPY ./package.json ./bun.lockb ./

RUN bun install

COPY . .

CMD [ "bun", "start" ]

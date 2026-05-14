FROM mcr.microsoft.com/playwright:v1.60.0-noble

RUN mkdir /app
WORKDIR /app
# COPY source dest
COPY . /app
# each person using this will install these
RUN npm install --force
RUN npx playwright install